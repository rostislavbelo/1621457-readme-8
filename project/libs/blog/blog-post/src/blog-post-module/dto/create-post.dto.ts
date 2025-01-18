import {
    ArrayMaxSize,
    IsArray,
    IsIn,
    IsMongoId,
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
  
  export class CreatePostDto {
    @IsIn(Object.values(PostTypes))
    public type: (typeof PostTypes)[keyof typeof PostTypes];
  
    @IsString()
    @IsMongoId()
    public authorId: string;
  
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    @Length(3, 10, { each: true })
    @NotContains(' ', { each: true })
    @Transform(({ value }) => value.map((item) => item.toLowerCase()))
    @Transform(({ value }) => Array.from(new Set(value)))
    @ArrayMaxSize(8)
    public tags: string[];
  
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
  
  // export class CreatePostDto {
  //   @IsIn(Object.values(PostTypes))
  //   public type: (typeof PostTypes)[keyof typeof PostTypes];
  
  //   @IsString()
  //   @IsMongoId()
  //   public authorId: string;
  
  //   @IsOptional()
  //   @IsArray()
  //   @IsString({ each: true })
  //   @Length(3, 10, { each: true })
  //   @NotContains(' ', { each: true })
  //   @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  //   @Transform(({ value }) => Array.from(new Set(value)))
  //   @ArrayMaxSize(8)
  //   public tags: string[];
  
  //   @ValidateIf((o) => o.type === PostTypes.Text || o.type === PostTypes.Video)
  //   @IsString()
  //   @Length(20, 50)
  //   public title: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Link)
  //   @IsUrl()
  //   public linkUrl: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Link)
  //   @IsOptional()
  //   @IsString()
  //   @MaxLength(300)
  //   public linkDescription: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Photo)
  //   @IsUrl()
  //   public photoUrl: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Quote)
  //   @IsString()
  //   @Length(20, 300)
  //   public quote: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Quote)
  //   @IsString()
  //   @Length(3, 50)
  //   public quoteAuthor: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Text)
  //   @IsString()
  //   @Length(50, 255)
  //   public teaser: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Text)
  //   @IsString()
  //   @Length(100, 1024)
  //   public text: string;
  
  //   @ValidateIf((obj) => obj.type === PostTypes.Video)
  //   @IsUrl()
  //   @Matches(YOUTUBE_REGEXP)
  //   public videoUrl: string;
  // }