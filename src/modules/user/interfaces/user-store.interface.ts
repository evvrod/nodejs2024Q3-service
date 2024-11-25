import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { User } from '../entities/user.entity';

export interface IUserStore {
  getAllUsers: () => Promise<User[]>;
  getUserById: (id: string) => Promise<User | undefined>;
  getUserByLogin: (login: string) => Promise<User | undefined>;
  createUser: (createUserDto: CreateUserDto) => Promise<User>;
  updatePassword: (
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;
}
