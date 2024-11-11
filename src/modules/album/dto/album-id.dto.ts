import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AlbumIdDto {
  @ApiProperty({
    description: 'Unique identifier of the album',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Album ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Album ID is required' })
  id: string;
}
