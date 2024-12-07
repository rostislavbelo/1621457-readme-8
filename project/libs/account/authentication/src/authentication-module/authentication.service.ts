import { Injectable, ConflictException } from '@nestjs/common';
import { BlogUserRepository, BlogUserEntity } from '@project/blog-user';
import { CreateUserDto } from '../dto/create-user.dto';
import { AUTH_USER_EXISTS } from './authentication.constant';
import dayjs from 'dayjs';

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly blogUserRepository: BlogUserRepository
    ) {}
    
    public async register(dto: CreateUserDto) {const {email, name, password} = dto;

    const blogUser = {
      email, name, avatarId: '', registrationDate: dayjs(new Date()).toDate(),
      passwordHash: ''
    };

    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password)

    return this.blogUserRepository.save(userEntity);
  }
}