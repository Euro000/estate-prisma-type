import { ApiProperty } from '@nestjs/swagger';

export class PostEntity {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'Post name' })
  name: string;

  @ApiProperty({ description: 'Number of likes' })
  likes: number;

  @ApiProperty({ description: 'ID of the user who created this post' })
  userId: string;

  @ApiProperty({ description: 'Custom boolean flag' })
  yay_u: boolean;

  @ApiProperty({ description: 'When the post was created' })
  createdAt: Date;

  @ApiProperty({ description: 'When the post was last updated' })
  updatedAt: Date;
}