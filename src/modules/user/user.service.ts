import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { IUserStore } from './interfaces/user-store.interface';
import { UserDto } from './dto/user.dto';

import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserStore') private storage: IUserStore,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.storage.createUser(createUserDto);
    this.eventEmitter.emit('user.create', user.id);

    return new UserDto(user);
  }

  async findAll() {
    return (await this.storage.getAllUsers()).map((el) => new UserDto(el));
  }

  async findById(id: string) {
    return new UserDto(await this.storage.getUserById(id));
  }

  async findByLogin(login: string) {
    const user = await this.storage.getUserByLogin(login);
    return user ? new UserDto(user) : null;
  }

  async findByLoginWithPass(login: string) {
    return await this.storage.getUserByLogin(login);
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    return new UserDto(
      await this.storage.updatePassword(id, updatePasswordDto),
    );
  }

  async remove(id: string) {
    return await this.storage.deleteUser(id);
  }
}
