import { ResponseUserDto } from '../dto/user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

export interface IUserStore {
  getAllUsers: () => Promise<ResponseUserDto[]>;
  getUserById: (id: string) => Promise<ResponseUserDto | undefined>;
  createUser: (createUserDto: CreateUserDto) => Promise<ResponseUserDto>;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => Promise<ResponseUserDto>;
  deleteUser: (id: string) => Promise<void>;
}
