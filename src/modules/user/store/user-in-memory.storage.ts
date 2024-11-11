import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserStore } from '../interfaces/user-store.interface';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ResponseUserDto } from 'src/modules/user/dto/user-response.dto';
import { UpdatePasswordDto } from 'src/modules/user/dto/update-password.dto';
import { User } from 'src/modules/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserInMemoryStorage implements IUserStore {
  private users: User[] = [];

  getAllUsers() {
    return this.users.map((el) => this.getUserWithoutPassword(el));
  }

  getUserById(id: string) {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getUserWithoutPassword(user);
  }

  createUser(createUserDto: CreateUserDto) {
    const timestamp = Date.now();
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    this.users.push(newUser);

    return this.getUserWithoutPassword(newUser);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.getUserByIdWithPass(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    user.password = updatePasswordDto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return this.getUserWithoutPassword(user);
  }

  deleteUser(id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException('User not found');
    }

    this.users.splice(index, 1);
    return true;
  }

  private getUserWithoutPassword(user: User): ResponseUserDto {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  private getUserByIdWithPass(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
