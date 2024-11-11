import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    type: String,
    example: 'The Show Must Go On',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description:
      'Unique identifier of the artist associated with the track, if any',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174001',
    nullable: true,
  })
  @IsOptional()
  artistId?: string | null;

  @ApiProperty({
    description:
      'Unique identifier of the album associated with the track, if any',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174002',
    nullable: true,
  })
  @IsOptional()
  albumId?: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    type: Number,
    example: 354,
  })
  @IsNumber()
  duration: number;
}
