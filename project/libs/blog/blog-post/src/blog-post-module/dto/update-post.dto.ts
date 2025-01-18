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
  
  // const YOUTUBE_REGEXP =
  //   /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
  
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
  
  // export class UpdatePostDto {
  //   @IsOptional()
  //   @IsArray()
  //   @IsString({ each: true })
  //   @Length(3, 10, { each: true })
  //   @NotContains(' ', { each: true })
  //   @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  //   @Transform(({ value }) => Array.from(new Set(value)))
  //   @ArrayMaxSize(8)
  //   public tags?: string[];
  
  //   @IsOptional()
  //   @IsString()
  //   @Length(20, 50)
  //   public title?: string;
  
  //   @IsOptional()
  //   @IsUrl()
  //   public linkUrl?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   @MaxLength(300)
  //   public linkDescription?: string;
  
  //   @IsOptional()
  //   @IsUrl()
  //   public photoUrl?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   @Length(20, 300)
  //   public quote?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   @Length(3, 50)
  //   public quoteAuthor?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   @Length(50, 255)
  //   public teaser?: string;
  
  //   @IsOptional()
  //   @IsString()
  //   @Length(100, 1024)
  //   public text?: string;
  
  //   @IsOptional()
  //   @IsUrl()
  //   @Matches(YOUTUBE_REGEXP)
  //   public videoUrl?: string;
  // }