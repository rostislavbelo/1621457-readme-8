import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'User unique address',
        example: 'user@user.ru'
      })
    public email: string;

    @ApiProperty({
        description: 'User name',
        example: 'Keks',
      })
    public name: string;

    @ApiProperty({
        description: 'Registration date',
        example: '1981-03-12',
      })
    public registrationDate: Date;

    @ApiProperty({
        description: 'Avatar Id',
        example: 'any random text',
      })    
    avatarId?: string;

    @ApiProperty({
        description: 'Password',
        example: '123456',
      })    
    password: string;
}
