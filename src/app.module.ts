import {
  Module,
  DynamicModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from 'src/modules/user/user.module';
import { RelationModule } from './modules/relation/relation.module';
import { LoggingModule } from './modules/logging/logging.module';
import { LoggingMiddleware } from './modules/logging/logging.middleware';
import { LoggingInterceptor } from './modules/logging/logging.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionsFilter } from './modules/logging/exception.filter';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggingModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
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

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
