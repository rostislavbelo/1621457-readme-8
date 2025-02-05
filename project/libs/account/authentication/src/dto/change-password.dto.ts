import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Old user password',
    example: '123456',
  })
  @IsString()
  @Length(6, 12)
  public oldPassword: string;

  @ApiProperty({
    description: 'New user password',
    example: '123456',
  })
  @IsString()
  @Length(6, 12)
  public newPassword: string;
}