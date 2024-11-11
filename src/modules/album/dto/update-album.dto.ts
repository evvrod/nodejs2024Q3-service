import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiPropertyOptional({
    description: 'The name of the album',
    type: String,
    example: 'Innuendo',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'The release year of the album',
    type: Number,
    example: 1991,
  })
  year?: number;

  @ApiPropertyOptional({
    description: 'The artist id associated with the album',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  artistId?: string | null;
}
