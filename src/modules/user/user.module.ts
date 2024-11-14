import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInMemoryStorage } from './store/user-in-memory.storage';
import { UserInPostgresStorage } from './store/user-in-postgres.storage';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? UserInMemoryStorage
          : UserInPostgresStorage,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
