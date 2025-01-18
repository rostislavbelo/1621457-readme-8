import { Injectable, NotFoundException } from '@nestjs/common';

import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentEntity } from './blog-comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class BlogCommentService {
  constructor(private readonly blogCommentRepository: BlogCommentRepository) {}

  public async getComment(id: string): Promise<BlogCommentEntity> {
    return this.blogCommentRepository.findById(id);
  }

  public async getComments(postId: string): Promise<BlogCommentEntity[]> {
    return await this.blogCommentRepository.findByPostId(postId);
  }

  public async createComment(
    postId: string,
    dto: CreateCommentDto
  ): Promise<BlogCommentEntity> {
    const newComment = new BlogCommentEntity({ ...dto, postId });
    await this.blogCommentRepository.save(newComment);

    return newComment;
  }

  public async deleteComment(id: string): Promise<void> {
    try {
      await this.blogCommentRepository.deleteById(id);
    } catch {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
  }

  // public async updateComment(
  //   id: string,
  //   dto: UpdateCommentDto
  // ): Promise<BlogCommentEntity> {
  //   const blogCommentEntity = new BlogCommentEntity(dto);

  //   try {
  //     await this.blogCommentRepository.update(blogCommentEntity);
  //     return blogCommentEntity;
  //   } catch {
  //     throw new NotFoundException(`Comment with ID ${id} not found`);
  //   }
  // }
}