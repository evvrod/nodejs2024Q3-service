import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';

import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiPropertyOptional({
    description: 'The name of the artist',
    type: String,
    example: 'Freddie Mercury',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Indicates whether the artist has won a Grammy award',
    type: Boolean,
    example: false,
  })
  grammy?: boolean;
}
