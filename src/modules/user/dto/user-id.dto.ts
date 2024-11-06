import { IsUUID, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    format: 'uuid',
  })
  @IsUUID('4', { message: 'User ID must be a valid UUID' })
  @IsNotEmpty({ message: 'User ID is required' })
  id: string;
}
