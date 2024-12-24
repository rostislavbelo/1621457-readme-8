import { Module } from '@nestjs/common';

import { PrismaClientModule } from '@project/blog-models';
import { BlogCommentRepository } from './blog-comment.repository';
import { BlogCommentController } from './blog-comment.controller';
import { BlogCommentService } from './blog-comment.service';
import { BlogCommentFactory } from './blog-comment.factory';

@Module({
  imports: [PrismaClientModule],
  providers: [BlogCommentRepository, BlogCommentService, BlogCommentFactory],
  controllers: [BlogCommentController],
  exports: [BlogCommentService],
})
export class BlogCommentModule {}