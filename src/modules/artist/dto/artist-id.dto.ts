import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ArtistIdDto {
  @ApiProperty({
    description: 'Unique identifier of the artist',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Artist ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Artist ID is required' })
  id: string;
}
