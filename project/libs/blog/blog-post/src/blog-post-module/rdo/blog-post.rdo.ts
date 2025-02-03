import { PostTypes } from '@project/shared/core';
import { Expose, Type } from 'class-transformer';
import { BlogPostContentRdo } from './blog-post-content.rdo';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostRdo {
  @ApiProperty({
    description: 'The unique post ID',
    example: '27e5868e-8f05-4879-856d-77c70bd3ff8d',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: `Post type: ${PostTypes.Video}, ${PostTypes.Text}, ${PostTypes.Quote}, ${PostTypes.Photo} or ${PostTypes.Link}`,
    example: 'VIDEO',
  })
  @Expose()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @ApiProperty({
    description: 'Likes count',
    example: '10',
  })
  @Expose()
  public likesCount: number;

  @ApiProperty({
    description: 'comments count',
    example: '15',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Date of creation',
    example: '2025-01-30T18:47:26',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Author ID',
    example: '677e53ed7baca31a45997160',
  })
  @Expose()
  public authorId: string;

  @ApiProperty({
    type: BlogPostContentRdo,
    description: 'Post content',
    example: {
      title: 'Заголовок на 20+ символов',
      teaser:
        'Текст с анонсом публикации. Минимальная длина 50 символов, максимальная 255.',
      text: 'Текст публикации. Минимальная длина 100 символов, максимальная 1024 символа.',
    },
  })
  @Expose()
  @Type(() => BlogPostContentRdo)
  public content: BlogPostContentRdo;

  @ApiProperty({
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  })
  @Expose()
  public tags: string[];

  @ApiProperty({
    description: 'Flag whether the post is published',
    example: true,
  })
  @Expose()
  public published: boolean;

  @ApiProperty({
    description: 'Flag whether the post is reposted',
    example: false,
  })
  @Expose()
  public reposted: boolean;

  @ApiProperty({
    description: 'The id of the original post, if the post is reposted',
    example: '27e5868e-8f05-4879-856d-77c70bd3ff8d',
  })
  @Expose()
  originalId: string;

  @ApiProperty({
    description: 'The id of the original author, if the post is reposted',
    example: '677e53ed7baca31a45997160',
  })
  @Expose()
  originalAuthorId: string;
}