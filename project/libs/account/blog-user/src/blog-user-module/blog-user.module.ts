import { Module } from '@nestjs/common';
import { BlogUserFactory } from './blog-user.factory';

@Module({
  controllers: [],
  providers: [BlogUserFactory],
  exports: []
})
export class BlogUserModule {}
