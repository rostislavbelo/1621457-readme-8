import { Module } from '@nestjs/common';
import { BlogCommentModule } from '@project/blog-comment';
import { BlogPostModule } from '@project/blog-post';
import { BlogConfigModule } from '@project/blog-config';

@Module({
  imports: [BlogConfigModule, BlogPostModule, BlogCommentModule],
})
export class AppModule {}
