import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BlogPostRdo } from './blog-post.rdo';

export class BlogPostWithPaginationRdo {
  @ApiProperty({
    description: 'List of posts',
    example: ['Post1', 'Post2'],
    type: [BlogPostRdo],
  })
  @Expose()
  @Type(() => BlogPostRdo)
  public entities: BlogPostRdo[];

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
