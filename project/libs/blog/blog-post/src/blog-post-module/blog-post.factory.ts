import { Injectable } from '@nestjs/common';

import { EntityFactory, Post } from '@project/shared/core';

import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class BlogPostFactory implements EntityFactory<BlogPostEntity> {
  public create(entityPlainData: Post): BlogPostEntity {
    return new BlogPostEntity(entityPlainData);
  }

  public static createFromCreatePostDto(dto: CreatePostDto): BlogPostEntity {
    const entity = new BlogPostEntity();
    entity.type = dto.type;
    entity.authorId = dto.authorId;
    entity.content = dto.content;
    entity.published = true;
    entity.reposted = false;
    entity.tags = dto.tags;

    return entity;
  }
}