
import { IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class AuthorIdDto {
  @ApiProperty({
    description: 'Id of the author of the request',
    example: '669aef3b7eadb26966f3c2cb',
  })
  @IsMongoId()
  authorId: string;
}