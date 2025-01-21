import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsOptional,
  IsString,
  Length,
  NotContains,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { PostTypes } from '@project/shared/core';
import {
  LinkContentDto,
  PhotoContentDto,
  PostContent,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto,
} from './post-content.dto';

export class UpdatePostDto {
  @IsIn(Object.values(PostTypes))
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(3, 10, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(8)
  public tags: string[];

  @IsOptional()
  @ValidateNested()
  @Type(() => PostContent, {
    discriminator: {
      property: '__type',
      subTypes: [
        { value: LinkContentDto, name: PostTypes.Link },
        { value: PhotoContentDto, name: PostTypes.Photo },
        { value: QuoteContentDto, name: PostTypes.Quote },
        { value: TextContentDto, name: PostTypes.Text },
        { value: VideoContentDto, name: PostTypes.Video },
      ],
    },
  })
  public content:
    | LinkContentDto
    | PhotoContentDto
    | QuoteContentDto
    | TextContentDto
    | VideoContentDto;
}
  
