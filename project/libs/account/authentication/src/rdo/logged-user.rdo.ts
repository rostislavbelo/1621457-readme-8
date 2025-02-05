import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoggedUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Access token',
    example: '134ce8babd-cc30-4805-9b12-d9420398e7c5'
  })
  @Expose()
  public accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2ExZjJiMjI5YjRkZjllNTJmMDgwMzYiLCJlbWFpbCI6InJvYm9jb3AzQG5vdGZvdW5kLmxvY2FsIiwibmFtZSI6Iktla3MiLCJpYXQiOjE3Mzg3MDMzMzIsImV4cCI6MTczODcwNDIzMn0.Hs-YCSnMejyULwBfBc6LCZpBTZc2Dvyc3aQ5F3udz1E',
  })
  @Expose()
  public refreshToken: string;
}