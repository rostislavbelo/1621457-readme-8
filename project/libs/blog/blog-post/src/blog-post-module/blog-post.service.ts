import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PaginationResult } from '@project/shared/core';
import { BlogPostRepository } from './blog-post.repository';
import { BlogPostQuery } from './blog-post.query';
import { BlogPostEntity } from './blog-post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { BlogPostFactory } from './blog-post.factory';
import { UpdatePostDto } from './dto/update-post.dto';
import { BlogCommentService, CreateCommentDto, BlogCommentEntity, BlogCommentQuery } from '@project/blog-comment';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly blogPostRepository: BlogPostRepository,
    private readonly blogCommentService: BlogCommentService
  ) {}

  public async getPosts(
    query?: BlogPostQuery
  ): Promise<PaginationResult<BlogPostEntity>> {
    return this.blogPostRepository.find(query);
  }

  public async createPost(dto: CreatePostDto): Promise<BlogPostEntity> {
    const newPost = BlogPostFactory.createFromCreatePostDto(dto);
    await this.blogPostRepository.save(newPost);

    return newPost;
  }

  public async deletePost(userId: string, postId): Promise<void> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }
    if (existsPost.authorId !== userId) {
      throw new ForbiddenException('Users can only delete their own posts');
    }
    await this.blogPostRepository.deleteById(postId);
  }

  public async getPost(id: string): Promise<BlogPostEntity> {
    return this.blogPostRepository.findById(id);
  }

  public async updatePost(
    id: string,
    dto: UpdatePostDto
  ): Promise<BlogPostEntity> {
    const existsPost = await this.blogPostRepository.findById(id);

    if (existsPost.authorId !== dto.authorId) {
      throw new ForbiddenException('Users can only edit their own posts');
    }
    
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
  
  public async addLike(userId: string, postId: string) {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} was not found`);
    }
    await this.blogPostRepository.addLike(userId, postId);
  }
  public async deleteLike(userId: string, postId: string) {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} was not found`);
    }
    await this.blogPostRepository.deleteLike(userId, postId);
  }

  public async createRepost(userId: string, postId: string) {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} was not found`);
    }
    existsPost.originalAuthorId = existsPost.authorId;
    existsPost.originalId = existsPost.id;
    existsPost.reposted = true;
    delete existsPost.createdAt;
    existsPost.id = undefined;
    existsPost.authorId = userId;
    delete existsPost.commentsCount;
    delete existsPost.likesCount;
    await this.blogPostRepository.save(existsPost);
    return existsPost;
  }

  public async createComment(postId: string, dto: CreateCommentDto) {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} was not found`);
    }
    const newComment = await this.blogCommentService.createComment(postId, dto);
    return newComment;
  }

  public async getComments(
    postId: string,
    query: BlogCommentQuery
  ): Promise<PaginationResult<BlogCommentEntity>> {
    const existsPost = await this.blogPostRepository.findById(postId);
    if (!existsPost) {
      throw new NotFoundException(`Post with id ${postId} was not found`);
    }
    return this.blogCommentService.getComments(postId, query);
  }

  public async getPostsToNotify() {
    return this.blogPostRepository.getPostsToNotify();
  }
  public async makeNotifyRecord() {
    await this.blogPostRepository.makeNotifyRecord();
  }
}