import { ResponseUserDto } from '../dto/user-response.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';

export interface IUserStore {
  getAllUsers: () => void;
  getUserById: (id: string) => ResponseUserDto | undefined;
  createUser: (createUserDto: CreateUserDto) => ResponseUserDto;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => ResponseUserDto;
  deleteUser: (id: string) => void;
}
