import { ApiProperty } from '@nestjs/swagger';
export class CommentCreateDto {
  @ApiProperty({
    description: '10-300 characters',
    example: 'I like your post!',
  })
  public text: string;
}