import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SwaggerConfig } from './modules/swagger/swagger.module';
import { LoggingService } from './modules/logging/logging.service';
import { AllExceptionsFilter } from './modules/logging/exception.filter';

async function bootstrap() {
  const configService = await NestFactory.create(AppModule).then((app) =>
    app.get(ConfigService),
  );
  const port = configService.get<number>('SERVER_PORT', 4000);
  const useInMemoryDb =
    configService.get<string>('USE_IN_MEMORY_DB') === 'true';

  const appModule = await AppModule.register(useInMemoryDb);

  const app = await NestFactory.create(appModule);

  SwaggerConfig.setup(app);

  // Получаем LoggingService
  const loggingService = app.get(LoggingService);

  // Регистрация глобальных слушателей для uncaughtException и unhandledRejection
  process.on('uncaughtException', (err) => {
    loggingService.error(`Uncaught Exception: ${err.message}`, err.stack);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    loggingService.error(`Unhandled Rejection: ${reason}`);
    process.exit(1);
  });

  // Регистрация кастомного фильтра ошибок для глобального перехвата
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));

  app.enableCors({
    allowedHeaders: 'Authorization, Content-Type',
  });
  await app.listen(port);
  loggingService.debug(`Application is running on: http://localhost:${port}`);
  loggingService.debug(
    `API Documentation is available on: http://localhost:${port}/api-docs`,
  );
  loggingService.debug(
    `${useInMemoryDb ? 'In-memory' : 'PostgreSQL'} database is used`,
  );
}

bootstrap();
