import {
  Body,
  Controller,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
  FileTypeValidator,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  BadRequestException,
  Get,
  Param,
  Query,
  HttpCode,
  Delete,
  Patch
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AxiosExceptionFilter } from './filters/axios-exception.filter';
import { CheckAuthGuard } from './guards/check-auth.guard';
import { ApplicationServiceURL } from './app.config';
import { InjectAuthorIdInterceptor } from '@project/interceptors';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostCreateDto } from './dto/post-create.dto';
import { PostTypes } from '@project/shared/core';
import { ApiResponse } from '@nestjs/swagger';
import {
  BlogPostQuery,
  BlogPostRdo,
  BlogPostResponseMessages,
  BlogPostWithPaginationRdo,
} from '@project/blog-post';
import { PostUpdateDto } from './dto/post-update.dto';
import { CommentCreateDto } from './dto/comment-create.dto';
import {
  BlogCommentQuery,
  BlogCommentWithPaginationRdo,
  CommentRdo,
} from '@project/blog-comment';

@Controller('posts')
@UseFilters(AxiosExceptionFilter)
export class BlogController {
  constructor(private readonly httpService: HttpService) {}

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @Post('/')
  public async create(
    @Body() dto: PostCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    if (dto.type === PostTypes.Photo) {
      if (file) {
        const formData = new FormData();
        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname
        );
        const { data } = await this.httpService.axiosRef.post(
          `${ApplicationServiceURL.Files}/upload`,
          formData
        );
        dto.content = {
          pictureId: data.id,
        };
      } else {
        throw new BadRequestException(
          `With ${PostTypes.Photo} a "file" field is required.`
        );
      }
    }

    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/`,
      dto
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/incrementPostsCount/${dto['authorId']}`
    );
    return data;
  }
  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get(':id')
  public async show(@Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${id}`
    );
    return data;
  }
  @ApiResponse({
    type: BlogPostWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.PostFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get('/')
  public async index(@Query() query: BlogPostQuery) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}`,
      {
        params: query,
      }
    );

    return data;
  }
  
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.LikeAdded,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('addLike/:postId')
  public async saveLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/addLike/${postId}`,
      dto
    );
  }
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.LikeDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('deleteLike/:postId')
  public async deleteLike(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/deleteLike/${postId}`,
      dto
    );
  }

  @ApiResponse({
    type: BlogPostRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.PostCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('repost/:postId')
  public async repost(@Param('postId') postId: string, @Body() dto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/repost/${postId}`,
      dto
    );
    return data;
  }
  
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: BlogPostResponseMessages.PostDeleted,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessages.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:postId')
  public async destroy(@Param('postId') postId: string, @Body() dto) {
    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/delete/${postId}`,
      dto
    );

    await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/decrementPostsCount/${dto['authorId']}`
    );
  }

  @ApiResponse({
    type: BlogPostRdo,
    description: BlogPostResponseMessages.PostUpdated,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: BlogPostResponseMessages.ValidationError,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: BlogPostResponseMessages.Forbidden,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Patch('/:id')
  public async update(
    @Param('id') id: string,
    @Body() dto: PostUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
        ],
        fileIsRequired: false,
      })
    )
    file?: Express.Multer.File
  ) {
    if (dto.type === PostTypes.Photo) {
      const { data: existsPost } = await this.httpService.axiosRef.get(
        `${ApplicationServiceURL.Posts}/${id}`
      );
      if (existsPost.type === PostTypes.Photo) {
        dto.content = existsPost.content;
      }
      if (file) {
        const formData = new FormData();
        formData.append(
          'file',
          new Blob([file.buffer], { type: file.mimetype }),
          file.originalname
        );
        const { data } = await this.httpService.axiosRef.post(
          `${ApplicationServiceURL.Files}/upload`,
          formData
        );
        dto.content = {
          pictureId: data.id,
        };
      } else if (existsPost.type !== PostTypes.Photo) {
        throw new BadRequestException(
          `With ${PostTypes.Photo} a "file" field is required.`
        );
      }
    }
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Posts}/${id}`,
      dto
    );
    return data;
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatus.CREATED,
    description: BlogPostResponseMessages.CommentCreated,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @UseGuards(CheckAuthGuard)
  @UseInterceptors(InjectAuthorIdInterceptor)
  @Post('/:postId/comments')
  public async createComment(
    @Param('postId') postId: string,
    @Body() dto: CommentCreateDto
  ) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      dto
    );
    return data;
  }

  @ApiResponse({
    type: BlogCommentWithPaginationRdo,
    status: HttpStatus.OK,
    description: BlogPostResponseMessages.CommentsFound,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: BlogPostResponseMessages.AuthFailed,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: BlogPostResponseMessages.PostNotFound,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: BlogPostResponseMessages.ServerError,
  })
  @Get('/:postId/comments')
  public async getComments(
    @Param('postId') postId: string,
    @Query() query: BlogCommentQuery
  ) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Posts}/${postId}/comments`,
      {
        params: query,
      }
    );
    return data;
  }
}
