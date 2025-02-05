import { ApiProperty } from '@nestjs/swagger';

export class UserRegisterDto {
  @ApiProperty({
    description: 'User unique email',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  public name: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'User avatar',
    required: false,
  })
  public avatar?: Express.Multer.File;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;
}