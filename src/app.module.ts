import { Module, DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { RelationModule } from './modules/relation/relation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {
  static async register(useInMemoryDb: boolean): Promise<DynamicModule> {
    const modules = [];
    modules.push(...[UserModule, RelationModule]);

    if (!useInMemoryDb) {
      modules.push(...(await this.loadDatabaseModules()));
    }

    return {
      module: AppModule,
      imports: [...modules],
    };
  }

  private static async loadDatabaseModules() {
    const { PrismaModule } = await import('./modules/prisma/prisma.module');
    return [PrismaModule];
  }
}
