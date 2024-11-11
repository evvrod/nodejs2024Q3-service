import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'The unique identifier of the album (UUID v4)',
    type: String,
    example: 'e2b7b636-8adf-4f1f-9c2e-8b41b0132bc7',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string; // uuid v4

  @ApiProperty({
    description: 'The name of the album',
    type: String,
    example: 'Innuendo',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The release year of the album',
    type: Number,
    example: 1991,
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The artist id associated with the album (nullable)',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    nullable: true,
  })
  @IsOptional()
  @IsString()
  artistId: string | null;
}
