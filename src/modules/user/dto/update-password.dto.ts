import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({ description: 'Old password' })
  @IsNotEmpty({ message: 'Old password is required' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'New password' })
  @IsNotEmpty({ message: 'New password is required' })
  @IsString()
  newPassword: string;
}
