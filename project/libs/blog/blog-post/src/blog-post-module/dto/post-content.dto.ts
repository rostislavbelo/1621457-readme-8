import { PostTypes } from '@project/shared/core';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Matches,
  MaxLength,
  IsMongoId,
} from 'class-validator';


const YOUTUBE_REGEXP =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/gi;

export class PostContent {
  __type: (typeof PostTypes)[keyof typeof PostTypes];
}

export class LinkContentDto extends PostContent {
  @ApiProperty({
    description: `Post url. Used with ${PostTypes.Link} and ${PostTypes.Video} types. When used with ${PostTypes.Video} must be a valid youtube link`,
    example: 'localhost/keks.jpg',
  })
  @IsUrl()
  public url: string;

  @ApiProperty({
    description: `Post description. Used with ${PostTypes.Link} (optional). Max 300 characters.`,
    example: 'Описание до 300 символов',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(300)
  public description?: string;
}

export class PhotoContentDto extends PostContent {
  @ApiProperty({
    description: `Mongo id of uploaded picture.`,
    example: 'localhost/keks.jpg',
  })
  @IsMongoId()
  public pictureId: string;
}

export class QuoteContentDto extends PostContent {
  @ApiProperty({
    description: `Post quote. Used with ${PostTypes.Quote}. 20-300 characters.`,
    example: 'Текст цитаты от 20 до 300 символов',
  })
  @IsString()
  @Length(20, 300)
  public quote: string;

  @ApiProperty({
    description: `Post quote author. Used with ${PostTypes.Quote}. 3-50 characters.`,
    example: 'Автор цитаты, от 3 до 50 символов',
  })
  @IsString()
  @Length(3, 50)
  public author: string;
}

export class TextContentDto extends PostContent {
  @ApiProperty({
    description: `Post title. Used with ${PostTypes.Text} and ${PostTypes.Video} types. 20-50 symbols.`,
    example: 'Заголовок на 20+ символов',
  })
  @IsString()
  @Length(20, 50)
  public title: string;

  @ApiProperty({
    description: `Post teaser. Used with ${PostTypes.Text}. 50-255 characters.`,
    example: 'Текст с анонсом публикации, от 50 до 255 символов',
  })
  @IsString()
  @Length(50, 255)
  public teaser: string;

  @ApiProperty({
    description: `Post main text. Used with ${PostTypes.Text}. 100-1024 characters.`,
    example: 'Основной текст публикации, от 100 до 1024 символов',
  })
  @IsString()
  @Length(100, 1024)
  public text: string;
}

export class VideoContentDto extends PostContent {
  @ApiProperty({
    description: `Post title. Used with ${PostTypes.Text} and ${PostTypes.Video} types. 20-50 symbols.`,
    example: 'Заголовок на 20+ символов',
  })
  @IsString()
  @Length(20, 50)
  public title: string;

  @ApiProperty({
    description: `Post url. Used with ${PostTypes.Link} and ${PostTypes.Video} types. When used with ${PostTypes.Video} must be a valid youtube link`,
    example: 'localhost/keks.jpg',
  })
  @IsUrl()
  @Matches(YOUTUBE_REGEXP)
  public url: string;
}
