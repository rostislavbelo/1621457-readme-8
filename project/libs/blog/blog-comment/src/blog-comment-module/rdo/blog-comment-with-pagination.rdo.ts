import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CommentRdo } from './comment.rdo';

export class BlogCommentWithPaginationRdo {
  @ApiProperty({
    description: 'List of comments',
    example: ['Comment1', 'Comment2'],
    type: [CommentRdo],
  })
  @Expose()
  @Type(() => CommentRdo)
  public entities: CommentRdo[];
  @ApiProperty({
    description: 'Total pages count',
    example: 10,
  })
  @Expose()
  public totalPages: number;
  @ApiProperty({
    description: 'Total items count',
    example: 50,
  })
  @Expose()
  public totalItems: number;
  @ApiProperty({
    description: "Current page's number",
    example: 2,
  })
  @Expose()
  public currentPage: number;
  @ApiProperty({
    description: 'Number of items per page',
    example: 20,
  })
  @Expose()
  public itemsPerPage: number;
}