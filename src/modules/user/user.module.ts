import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserInMemoryStorage } from './store/user-in-memory.storage';

@Module({
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserStore',
      useClass:
        process.env.USE_IN_MEMORY_DB === 'true'
          ? UserInMemoryStorage
          : UserInMemoryStorage,
    },
    UserService,
  ],
  exports: [UserService],
})
export class UserModule {}
