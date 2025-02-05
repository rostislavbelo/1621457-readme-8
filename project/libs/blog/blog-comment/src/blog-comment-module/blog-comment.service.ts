import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { BlogCommentQuery } from './blog-comment.query';
import { PaginationResult } from '@project/shared/core';

@Injectable()
export class BlogCommentService {
  constructor(private readonly blogCommentRepository: BlogCommentRepository) {}

  public async getComment(id: string): Promise<BlogCommentEntity> {
    return this.blogCommentRepository.findById(id);
  }

  public async getComments(
    postId: string,
    query: BlogCommentQuery
  ): Promise<PaginationResult<BlogCommentEntity>> {
    return await this.blogCommentRepository.findByPostId(postId, query);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity({ ...dto, postId });
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async deleteComment(id: string, authorId: string): Promise<void> {
    const existsComment = await this.blogCommentRepository.findById(id);
    if (!existsComment) {
      throw new NotFoundException(`Comment with id ${id} was not found.`);
    }
    if (existsComment.authorId !== authorId) {
      throw new ForbiddenException('Users can only delete their own comments.');
    }
    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }
}
