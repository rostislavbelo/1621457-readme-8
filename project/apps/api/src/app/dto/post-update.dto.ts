import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import {
  LinkContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from '@project/blog-post';
import { PostTypes } from '@project/shared/core';
@ApiExtraModels(
  LinkContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto
)
export class PostUpdateDto {
  @ApiProperty({
    description: `Post type: ${PostTypes.Video}, ${PostTypes.Text}, ${PostTypes.Quote}, ${PostTypes.Photo} or ${PostTypes.Link}`,
    example: 'VIDEO',
  })
  public type: (typeof PostTypes)[keyof typeof PostTypes];
  @ApiProperty({
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  })
  public tags: string[];
  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
    required: false,
    description: `Post content. With ${PostTypes.Photo} type is not required.`,
  })
  public content:
    | LinkContentDto
    | QuoteContentDto
    | TextContentDto
    | VideoContentDto
    | object;
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: `File to upload. Used with ${PostTypes.Photo} type.`,
    required: false,
  })
  public file?: Express.Multer.File;

  @ApiProperty({
    description: 'Whether the post is published',
    example: true,
    required: false,
  })
  public published: boolean;
}