import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: '10-300 characters',
    example: 'I like your post!',
  })
  @IsString()
  @Length(10, 300)
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752',
  })
  @IsUUID()
  public postId: string;

  @ApiProperty({
    description: 'Author ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752',
  })
  @IsUUID()
  public authorId: string;
}