import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { IUserStore } from '../interfaces/user-store.interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';

import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { ResponseUserDto } from 'src/modules/user/dto/user-response.dto';
import { UpdatePasswordDto } from 'src/modules/user/dto/update-password.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class UserInPostgresStorage implements IUserStore {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => ({
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    }));
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.getUserWithoutPassword({
      ...user,
      createdAt: Number(user.createdAt),
      updatedAt: Number(user.updatedAt),
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const timestamp = Date.now();

    const newUser = await this.prisma.user.create({
      data: {
        login,
        password,
        version: 1,
        createdAt: String(timestamp),
        updatedAt: String(timestamp),
      },
    });

    return this.getUserWithoutPassword({
      ...newUser,
      createdAt: Number(newUser.createdAt),
      updatedAt: Number(newUser.updatedAt),
    });
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const timestamp = Date.now();
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
        updatedAt: String(timestamp),
      },
    });

    return this.getUserWithoutPassword({
      ...updatedUser,
      createdAt: Number(updatedUser.createdAt),
      updatedAt: Number(updatedUser.updatedAt),
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  private getUserWithoutPassword(user: User): ResponseUserDto {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }
}