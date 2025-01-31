import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  Inject
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { BlogUserEntity, BlogUserRepository } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthMessages } from './authentication.constant';
import { LoginUserDto } from '../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Token, User } from '@project/shared/core';
import { jwtConfig } from '@project/account-config';
import { RefreshTokenService } from '../refresh-token-module/refresh-token.service';
import { createJWTPayload } from '@project/helpers';
import { ChangePasswordDto } from '../dto/change-password.dto';


@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, name, avatar, password } = dto;

    const blogUser = {
      email,
      name,
      avatar,
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthMessages.UserExists);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);

    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async changePassword(id: string, dto: ChangePasswordDto) {
    const { oldPassword, newPassword } = dto;
    const existUser = await this.blogUserRepository.findById(id);

    if (!existUser) {
      throw new UnauthorizedException(AuthMessages.UserNotFound);
    }

    if (!(await existUser.comparePassword(oldPassword))) {
      throw new UnauthorizedException(AuthMessages.OldPasswordWrong);
    }

    await existUser.setPassword(newPassword);

    await this.blogUserRepository.update(existUser);

    return existUser;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password } = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new UnauthorizedException(AuthMessages.LoginFailed);
    }

    if (!(await existUser.comparePassword(password))) {
      throw new UnauthorizedException(AuthMessages.LoginFailed);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthMessages.UserNotFound);
    }

    return user;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = {
      ...accessTokenPayload,
      tokenId: crypto.randomUUID(),
    };
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.jwtOptions.refreshTokenSecret,
          expiresIn: this.jwtOptions.refreshTokenExpiresIn,
        }
      );

      return { accessToken, refreshToken };
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException(
        'Ошибка при создании токена.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  public async getUserByEmail(email: string) {
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return existUser;
  }

  
  public async toggleSubscription(subscriberId, subscribedToId) {
    const subscriber = await this.blogUserRepository.findById(subscriberId);

    if (!subscriber) {
      throw new NotFoundException(
        `Current user (subscriber) with id ${subscriberId} not found`
      );
    }

    const subscribedTo = await this.blogUserRepository.findById(subscribedToId);

    if (!subscribedTo) {
      throw new NotFoundException(`User with id ${subscribedToId} not found`);
    }

    if (subscriber.subscriptions.includes(subscribedToId)) {
      subscriber.subscriptions = subscriber.subscriptions.filter(
        (id) => id !== subscribedToId
      );
      subscribedTo.subscribersCount -= 1;
    } else {
      subscriber.subscriptions.push(subscribedToId);
      subscribedTo.subscribersCount += 1;
    }

    await Promise.all([
      this.blogUserRepository.update(subscriber),
      this.blogUserRepository.update(subscribedTo),
    ]);

    return subscriber;
  }
}
