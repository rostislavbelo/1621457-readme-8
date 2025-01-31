import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl, Length, Matches } from 'class-validator';
import { AuthenticationValidateMessage } from '../authentication-module/authentication.constant';

const IMAGES_TYPES = /\.(jpe?g|png)$/i;

export class CreateUserDto {
    @ApiProperty({
        description: 'User unique address',
        example: 'user@user.ru'
      })
    @IsEmail({}, { message: AuthenticationValidateMessage.EmailNotValid })  
    public email: string;

    @ApiProperty({
        description: 'User name',
        example: 'Keks',
      })
    @IsString()
    @Length(3, 50)  
    public name: string;

    @ApiProperty({
      description: 'User avatar path',
      example: '/images/user.png',
      required: false,
    })
    @Matches(IMAGES_TYPES)
    @IsUrl()
    public avatar?: string;

    @ApiProperty({
        description: 'Password',
        example: '123456',
      })
    @IsString()
    @Length(6, 12)     
    password: string;
}
