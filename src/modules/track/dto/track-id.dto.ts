import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TrackIdDto {
  @ApiProperty({
    description: 'Unique identifier of the track',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'Track ID must be a valid UUID' })
  @IsNotEmpty({ message: 'Track ID is required' })
  id: string;
}
