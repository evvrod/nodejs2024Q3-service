import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'Unique identifier of the user',
    type: String,
    example: 'b46dbb69-4b3b-4119-9f8a-45ec02a02863',
    format: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @ApiProperty({
    description: 'Login or username of the user',
    type: String,
    example: 'TestUser',
  })
  @IsString()
  login: string;

  @ApiProperty({
    description: 'Version number for the user record',
    type: Number,
    example: 1,
  })
  version: number;

  @ApiProperty({
    description: 'Timestamp of when the user was created',
    type: Number,
    example: 1605000000,
  })
  createdAt: number;

  @ApiProperty({
    description: 'Timestamp of when the user was created',
    type: Number,
    example: 1655000000,
  })
  updatedAt: number;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.version = user.version;
    this.createdAt = Number(user.createdAt);
    this.updatedAt = Number(user.updatedAt);
  }
}
