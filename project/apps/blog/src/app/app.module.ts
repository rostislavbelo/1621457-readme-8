import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogCommentModule } from '@project/blog-comment';

@Module({
  imports: [BlogCommentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
