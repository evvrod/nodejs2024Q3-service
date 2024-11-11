import { ApiProperty } from '@nestjs/swagger';
import { Artist } from 'src/modules/artist/entities/artist.entity';
import { Album } from 'src/modules/album/entities/album.entity';
import { Track } from 'src/modules/track/entities/track.entity';

export class GetAllFavoritesResponseDto {
  @ApiProperty({
    description: 'List of favorite artists',
    type: [Artist],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'John Doe',
        grammy: true,
      },
      // Другие артисты...
    ],
  })
  artists: Artist[];

  @ApiProperty({
    description: 'List of favorite albums',
    type: [Album],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'Greatest Hits',
        year: 2020,
        artistId: '123e4567-e89b-12d3-a456-426614174000',
      },
      // Другие альбомы...
    ],
  })
  albums: Album[];

  @ApiProperty({
    description: 'List of favorite tracks',
    type: [Track],
    example: [
      {
        id: '123e4567-e89b-12d3-a456-426614174002',
        name: 'Hit Song',
        artistId: '123e4567-e89b-12d3-a456-426614174000',
        albumId: '123e4567-e89b-12d3-a456-426614174001',
        duration: 240,
      },
      // Другие треки...
    ],
  })
  tracks: Track[];
}
