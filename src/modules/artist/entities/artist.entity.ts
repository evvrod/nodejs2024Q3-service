import { IsNotEmpty, IsString, IsUUID, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'The unique identifier of the artist (UUID)',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'The name of the artist',
    type: String,
    example: 'Freddie Mercury',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates whether the artist has won a Grammy award',
    type: Boolean,
    example: false,
  })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
