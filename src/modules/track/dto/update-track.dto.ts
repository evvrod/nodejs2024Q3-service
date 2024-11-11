import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiPropertyOptional({
    description: 'The name of the track',
    type: String,
    example: 'The Show Must Go On',
  })
  name?: string;

  @ApiPropertyOptional({
    description:
      'Unique identifier of the artist associated with the track, if any',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  artistId?: string | null;

  @ApiPropertyOptional({
    description:
      'Unique identifier of the album associated with the track, if any',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174002',
    nullable: true,
  })
  albumId?: string | null;

  @ApiPropertyOptional({
    description: 'Duration of the track in seconds',
    type: Number,
    example: 354,
  })
  duration?: number;
}
