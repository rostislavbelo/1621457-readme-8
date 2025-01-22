import { PostTypes } from '@project/shared/core';

import {
    IsOptional,
    IsString,
    IsUrl,
    Length,
    Matches,
    MaxLength,
  } from 'class-validator';
  
  const YOUTUBE_REGEXP =
    /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;
  
    export class PostContent {
      __type: (typeof PostTypes)[keyof typeof PostTypes];
    }
  
  export class LinkContentDto extends PostContent {
    @IsUrl()
    public url: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(300)
    public description?: string;
  }
  
  export class PhotoContentDto extends PostContent {
    @IsUrl()
    public url: string;
  }
  
  export class QuoteContentDto extends PostContent {
    @IsString()
    @Length(20, 300)
    public quote: string;
  
    @IsString()
    @Length(3, 50)
    public author: string;
  }
  
  export class TextContentDto extends PostContent {
    @IsString()
    @Length(20, 50)
    public title: string;
  
    @IsString()
    @Length(50, 255)
    public teaser: string;
  
    @IsString()
    @Length(100, 1024)
    public text: string;
  }
  
  export class VideoContentDto extends PostContent {
    @IsString()
    @Length(20, 50)
    public title: string;
  
    @IsUrl()
    @Matches(YOUTUBE_REGEXP)
    public url: string;
  }