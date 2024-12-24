import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateCommentDto {
  @ApiProperty({
    description: '10-300 characters',
    example: 'I like your post!',
  })
  @IsString()
  @Length(10, 300)
  public text: string;
}