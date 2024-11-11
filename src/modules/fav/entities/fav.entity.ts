import { ApiProperty } from '@nestjs/swagger';

export class Fav {
  @ApiProperty({
    description: 'IDs of favorite artists',
    type: [String],
    example: ['artistId1', 'artistId2'],
  })
  artists: string[];

  @ApiProperty({
    description: 'IDs of favorite albums',
    type: [String],
    example: ['albumId1', 'albumId2'],
  })
  albums: string[];

  @ApiProperty({
    description: 'IDs of favorite tracks',
    type: [String],
    example: ['trackId1', 'trackId2'],
  })
  tracks: string[];
}
