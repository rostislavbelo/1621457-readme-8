import {
    Controller,
    Get,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';  
  import { fillDto } from '@project/helpers';  
  import { BlogCommentService } from './blog-comment.service';
  import { CommentRdo } from './rdo/comment.rdo';
  
  @Controller('comments')
  export class BlogCommentController {
    constructor(private readonly blogCommentService: BlogCommentService) {}

    @Get('/:id')
    public async show(@Param('id') id: string) {
      const commentEntity = await this.blogCommentService.getComment(id);
      return fillDto(CommentRdo, commentEntity.toPOJO());
    }
  
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param('id') id: string) {
      await this.blogCommentService.deleteComment(id);
    }  
  }