import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserDetailsRdo {
  @ApiProperty({
    description: 'The unique user ID',
    example: 'b1061c6425ea6329c3d6a04a',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User avatar path',
    example: '/images/user.png',
    required: false,
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User name',
    example: 'Keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Number of subscribers',
    example: 5,
  })
  @Expose()
  public subscribersCount: number;

  @ApiProperty({
    description: 'Number of posts',
    example: 6,
  })
  @Expose()
  public postsCount: number;

  @ApiProperty({
    description: 'Registration date',
    example: '2025-01-28',
  })
  @Expose()
  public createdAt: string;
}