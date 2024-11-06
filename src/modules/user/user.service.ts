import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUserStore } from './interfaces/user-store.interface';

@Injectable()
export class UserService {
  constructor(@Inject('IUserStore') private storage: IUserStore) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.createUser(createUserDto);
  }

  findAll() {
    return this.storage.getAllUsers();
  }

  findOne(id: string) {
    return this.storage.getUserById(id);
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return this.storage.updatePassword(id, updatePasswordDto);
  }

  remove(id: string) {
    return this.storage.deleteUser(id);
  }
}
