import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString, Length } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: '10-300 characters',
    example: 'I like your post!',
  })
  @IsString()
  @Length(10, 300)
  public text: string;

  @ApiProperty({
    description: 'Author ID',
    example: '63548106482c030b503e323452',
  })
  @IsMongoId()
  public authorId: string;
}