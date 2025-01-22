import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

export class LoginUserDto {
    @ApiProperty({
      description: 'User uniq email',
      example: 'user@user.ru',
    })
    @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })
    public email: string;

    @ApiProperty({
      description: 'User password',
      example: '123456'
    })
    @IsString()
    @Length(6, 12)
    public password: string;
  }