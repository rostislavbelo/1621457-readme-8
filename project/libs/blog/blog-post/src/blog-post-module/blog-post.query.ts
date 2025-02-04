import { Transform } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsIn,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { PostTypes, SortDirection, SortType } from '@project/shared/core';
import { BlogPostQueryDefaults } from './blog-post.constant';
import { ApiProperty } from '@nestjs/swagger';

export class BlogPostQuery {
  @ApiProperty({
    description: 'Max items per page',
    required: false,
    default: BlogPostQueryDefaults.PostCountLimit,
  })
  @Transform(({ value }) => +value || BlogPostQueryDefaults.PostCountLimit)
  @IsNumber()
  @IsOptional()
  public limit: number = BlogPostQueryDefaults.PostCountLimit;

  @ApiProperty({
    description: `Sorting direction`,
    required: false,
    default: BlogPostQueryDefaults.SortDirection,
    enum: SortDirection,
  })
  @IsIn(Object.values(SortDirection))
  @IsOptional()
  public sortDirection: SortDirection = BlogPostQueryDefaults.SortDirection;
  @ApiProperty({
    description: `Sorting type`,
    required: false,
    default: BlogPostQueryDefaults.SortType,
    enum: SortType,
  })
  @IsIn(Object.values(SortType))
  @IsOptional()
  public sortBy: SortType = BlogPostQueryDefaults.SortType;

  @ApiProperty({
    description: 'Current page number',
    required: false,
    default: BlogPostQueryDefaults.PageCount,
  })
  @Transform(({ value }) => +value || BlogPostQueryDefaults.PageCount)
  @IsNumber()
  @IsOptional()
  public page: number = BlogPostQueryDefaults.PageCount;

  @ApiProperty({
    description: 'Array of tags to search by',
    required: false,
  })
  @IsString({ each: true })
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Type of posts to search by',
    required: false,
    enum: Object.values(PostTypes),
  })
  @IsIn(Object.values(PostTypes))
  @IsOptional()
  public type?: (typeof PostTypes)[keyof typeof PostTypes];

  @ApiProperty({
    description: 'Text to search by in titles of posts',
    required: false,
  })
  @IsString()
  @IsOptional()
  public search?: string;

  @ApiProperty({
    description: 'If true - show drafts of current user',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  public drafts?: boolean;

  @ApiProperty({
    description: 'Id of author to search by',
    required: false,
  })
  @IsMongoId()
  @IsOptional()
  public authorId?: string;
}
