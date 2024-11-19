import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUserStore } from './interfaces/user-store.interface';

@Injectable()
export class UserService {
  constructor(@Inject('IUserStore') private storage: IUserStore) {}

  async create(createUserDto: CreateUserDto) {
    return await this.storage.createUser(createUserDto);
  }

  async findAll() {
    return await this.storage.getAllUsers();
  }

  async findOne(id: string) {
    return await this.storage.getUserById(id);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return await this.storage.updatePassword(id, updatePasswordDto);
  }

  async remove(id: string) {
    return await this.storage.deleteUser(id);
  }
}
