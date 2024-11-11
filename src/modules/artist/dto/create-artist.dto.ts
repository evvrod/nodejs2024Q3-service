import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    type: String,
    example: 'Freddie Mercury',
  })
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Indicates whether the artist has won a Grammy award',
    type: Boolean,
    example: false,
  })
  @IsNotEmpty({ message: 'The he Grammy award status is required' })
  @IsBoolean()
  grammy: boolean;
}
