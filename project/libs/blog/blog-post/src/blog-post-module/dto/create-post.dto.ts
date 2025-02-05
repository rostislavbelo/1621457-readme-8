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
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface
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
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';

const ANY_LETTERS_REGEXP = /^\p{L}.*$/u;

@ValidatorConstraint({ name: 'startsWithLetter' })
export class startsWithLetterValidator implements ValidatorConstraintInterface {
  validate(values: string[] = []): boolean {
    if (values.length) {
      return values.every((value) => ANY_LETTERS_REGEXP.test(value));
    }
    return false;
  }
}

@ApiExtraModels(
  LinkContentDto,
  PhotoContentDto,
  QuoteContentDto,
  TextContentDto,
  VideoContentDto
)
export class CreatePostDto {
  @ApiProperty({
    description: `Post type: ${PostTypes.Video}, ${PostTypes.Text}, ${PostTypes.Quote}, ${PostTypes.Photo} or ${PostTypes.Link}`,
    example: 'VIDEO',
  })
  @IsIn(Object.values(PostTypes))
  public type: (typeof PostTypes)[keyof typeof PostTypes];

  @ApiProperty({
    description: 'Author ID',
    example: '677e53ed7baca31a45997160',
  })
  @IsString()
  @IsMongoId()
  public authorId: string;

  @ApiProperty({
    description: 'Array of tags',
    example: ['cats', 'celebrities'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Length(3, 10, { each: true })
  @NotContains(' ', { each: true })
  @Transform(({ value }) => value.map((item) => item.toLowerCase()))
  @Transform(({ value }) => Array.from(new Set(value)))
  @ArrayMaxSize(8)
  @Validate(startsWithLetterValidator, {
    message: 'The first character of a tag must be a letter.',
  })
  public tags: string[];

  @ApiProperty({
    oneOf: [
      { $ref: getSchemaPath(LinkContentDto) },
      { $ref: getSchemaPath(PhotoContentDto) },
      { $ref: getSchemaPath(QuoteContentDto) },
      { $ref: getSchemaPath(TextContentDto) },
      { $ref: getSchemaPath(VideoContentDto) },
    ],
  })
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
