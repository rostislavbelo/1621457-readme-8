import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PostTypes } from '@project/shared/core';

export class BlogPostContentRdo {
  @ApiProperty({
    description: `Post title. Used with ${PostTypes.Text} and ${PostTypes.Video} types. 20-50 symbols.`,
    example: 'Заголовок на 20+ символов',
    required: false,
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: `Post url. Used with ${PostTypes.Link} and ${PostTypes.Video} types. When used with ${PostTypes.Video} must be a valid youtube link`,
    example: 'localhost/keks.jpg',
    required: false,
  })
  @Expose()
  public url: string;

  @ApiProperty({
    description: `Mongo id of uploaded picture. Used with ${PostTypes.Photo} type`,
    example: 'localhost/keks.jpg',
  })
  @Expose()
  public pictureId: string;

  @ApiProperty({
    description: `Post description. Used with ${PostTypes.Link} (optional). Max 300 characters.`,
    example: 'Описание до 300 символов',
    required: false,
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: `Post quote. Used with ${PostTypes.Quote}. 20-300 characters.`,
    example: 'Текст цитаты от 20 до 300 символов',
    required: false,
  })
  @Expose()
  public quote: string;

  @ApiProperty({
    description: `Post quote author. Used with ${PostTypes.Quote}. 3-50 characters.`,
    example: 'Автор цитаты, от 3 до 50 символов',
    required: false,
  })
  @Expose()
  public author: string;

  @ApiProperty({
    description: `Post teaser. Used with ${PostTypes.Text}. 50-255 characters.`,
    example: 'Текст с анонсом публикации, от 50 до 255 символов',
    required: false,
  })
  @Expose()
  public teaser: string;

  @ApiProperty({
    description: `Post main text. Used with ${PostTypes.Text}. 100-1024 characters.`,
    example: 'Основной текст публикации, от 100 до 1024 символов',
    required: false,
  })
  @Expose()
  public text: string;
}
