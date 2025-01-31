import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenPairRdo {
  @ApiProperty({
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imtla3NAa2Vrcy5uZXQiLCJuYW1lIjoiS2VrcyIsImlkIjoiNjcxM2JmZGRiZTdiMTZjNDg5NTE2MTkwIiwiaWF0IjoxNzMwNzE0NjEzLCJleHAiOjE3MzA4ODc0MTN9.7Om33pMEEId1vu9lyP8TB4b1Ou8-XVjsDOXAAbhONwY',
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Imtla3NAa2Vrcy5uZXQiLCJuYW1lIjoiS2VrcyIsImlkIjoiNjcxM2JmZGRiZTdiMTZjNDg5NTE2MTkwIiwiaWF0IjoxNzMwNzE0NjEzLCJleHAiOjE3MzA4ODc0MTN9.7Om33pMEEId1vu9lyP8TB4b1Ou8-XVjsDOXAAbhONwY',
  })
  @Expose()
  public refreshToken: string;
}