import { PostTypes } from '@project/shared/core';
import { Expose, Type } from 'class-transformer';
import { BlogPostContentRdo } from './blog-post-content.rdo';

export class BlogPostRdo {
  @Expose()
  public id: string;

  @Expose()
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @Expose()
  public likesCount: number;

  @Expose()
  public commentsCount: number;

  @Expose()
  public createdAt: string;

  @Expose()
  public authorId: string;

  @Expose()
  @Type(() => BlogPostContentRdo)
  public content: BlogPostContentRdo;

  @Expose()
  public tags: string[];

  @Expose()
  public published: boolean;

  @Expose()
  public reposted: boolean;

  @Expose()
  originalId: string;

  @Expose()
  originalAuthorId: string;
}