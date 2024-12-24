import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    // Patch,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';
  
  import { fillDto } from '@project/helpers';
  
  import { BlogCommentService } from './blog-comment.service';
  import { CreateCommentDto } from './dto/create-comment.dto';
  // import { UpdateCommentDto } from './dto/update-comment.dto';
  import { CommentRdo } from './rdo/comment.rdo';
  
  @Controller('comments')
  export class BlogCommentController {
    constructor(private readonly blogCommentService: BlogCommentService) {}
  
    @Get('/:id')
    public async show(@Param('id') id: string) {
      const commentEntity = await this.blogCommentService.getComment(id);
      return fillDto(CommentRdo, commentEntity.toPOJO());
    }
  
    @Get('/')
    public async index() {
      const blogCommentEntities = await this.blogCommentService.getAllComments();
      const comments = blogCommentEntities.map((blogComment) =>
        blogComment.toPOJO()
      );
      return fillDto(CommentRdo, comments);
    }
  
    @Post('/')
    public async create(@Body() dto: CreateCommentDto) {
      const newComment = await this.blogCommentService.createComment(dto);
      return fillDto(CommentRdo, newComment.toPOJO());
    }
  
    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    public async destroy(@Param('id') id: string) {
      await this.blogCommentService.deleteComment(id);
    }
  
    // @Patch('/:id')
    // public async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    //   const updatedComment = await this.blogCommentService.updateComment(id, dto);
    //   return fillDto(CommentRdo, updatedComment.toPOJO());
    // }
  }