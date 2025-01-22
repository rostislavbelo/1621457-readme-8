import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Comment } from '@project/shared/core';

export class CommentRdo implements Comment {
  @ApiProperty({
    description: 'Comment ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: '10-300 characters',
    example: 'I like your post!',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Post ID',
    example: '4e8a6ef4-2e28-46f6-ae5b-1d69b5dc1752',
  })
  @Expose()
  public postId: string;

  @ApiProperty({
    description: 'Author ID',
    example: '63548106482c030b503e323452',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    description: 'Created at',
  })
  @Expose()
  public createdAt: Date;
}