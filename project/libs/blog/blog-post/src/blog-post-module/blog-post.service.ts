import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationResult } from '@project/shared/core';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostFactory } from './blog-post.factory';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class BlogPostService {
  constructor(private readonly blogPostRepository: BlogPostRepository) {}

  public async getAllPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(id: string): Promise<void> {
    try {
      await this.blogPostRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);
    let isSameTags = true;
    let hasChanges = false;

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined && key !== 'tags' && existsPost[key] !== value) {
        existsPost[key] = value;
        hasChanges = true;
      }

      if (key === 'tags' && value) {
        const currentTags = existsPost.tags;

        isSameTags =
          currentTags.length === value.length &&
          currentTags.every((tag) => value.includes(tag));

        if (!isSameTags) {
          existsPost.tags = value;
        }
      }
    }

    if (isSameTags && !hasChanges) {
      return existsPost;
    }

    await this.blogPostRepository.update(existsPost);

    return existsPost;
  }
}