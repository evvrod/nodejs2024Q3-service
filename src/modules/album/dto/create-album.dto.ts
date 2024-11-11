import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    type: String,
    example: 'Innuendo',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The release year of the album',
    type: Number,
    example: 1991,
  })
  @IsNotEmpty({ message: 'Year is required' })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The artist id associated with the album (nullable)',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    nullable: true,
  })
  @IsOptional()
  artistId: string | null;
}
