import { PostTypes } from '@project/shared/core';
import {
  LinkContentDto,
  PhotoContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from '@project/blog-post';

export class AddNewPostDto {
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  public tags: string[];

  public content:
    | LinkContentDto
    | PhotoContentDto
    | QuoteContentDto
    | TextContentDto
    | VideoContentDto;
}