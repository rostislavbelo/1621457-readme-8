import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { BlogPostQueryDefaults } from './blog-comment.constant';
import { ApiProperty } from '@nestjs/swagger';
export class BlogCommentQuery {
  @ApiProperty({
    description: 'Max items per page',
    required: false,
    default: BlogPostQueryDefaults.CommentCountLimit,
  })
  @Transform(({ value }) => +value || BlogPostQueryDefaults.CommentCountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = BlogPostQueryDefaults.CommentCountLimit;
  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: BlogPostQueryDefaults.PageCount,
  })
  @Transform(({ value }) => +value || BlogPostQueryDefaults.PageCount)
  @IsNumber()
  @IsOptional()
  public page: number = BlogPostQueryDefaults.PageCount;
}