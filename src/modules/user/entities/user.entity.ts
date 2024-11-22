import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class User {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  id: string;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
