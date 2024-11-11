import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from 'src/modules/user/user.module';
import { RelationModule } from 'src/modules/relation/relation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    RelationModule,
  ],
})
export class AppModule {}
