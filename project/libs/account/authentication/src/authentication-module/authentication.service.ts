import { Injectable, ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthenticationMessage } from './authentication.constant';
import dayjs from 'dayjs';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly blogUserRepository: BlogUserRepository
    ) {}
    
    public async register(dto: CreateUserDto): Promise<BlogUserEntity> {
    
    const {email, name, password} = dto;

    const blogUser = {
      email, name, avatarId: '', registrationDate: dayjs(new Date()).toDate(),
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AuthenticationMessage.Auth_User_Exits);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)

    this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const {email, password} = dto;
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (!existUser) {
      throw new NotFoundException(AuthenticationMessage.Auth_User_Not_Found);
    }

    if (!await existUser.comparePassword(password)) {
      throw new UnauthorizedException(AuthenticationMessage.Auth_User_Password_Wrong);
    }

    return existUser;
  }

  public async getUser(id: string) {
    const user = await this.blogUserRepository.findById(id);

    if (!user) {
      throw new NotFoundException(AuthenticationMessage.Auth_User_Not_Found);
    }

    return user;
  }
}