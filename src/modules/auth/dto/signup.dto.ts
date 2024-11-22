import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({
    description: 'Login of the user',
    type: String,
    example: 'TestUser',
  })
  @IsString()
  @IsNotEmpty({ message: 'Login is required' })
  login: string;

  @ApiProperty({
    description: 'Password for the user',
    type: String,
    example: 'TestPassword',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
