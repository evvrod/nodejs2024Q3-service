import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SwaggerConfig } from './modules/swagger/swagger.module';

async function bootstrap() {
  const configService = await NestFactory.create(AppModule).then((app) =>
    app.get(ConfigService),
  );
  const port = configService.get<number>('PORT', 4000);
  const useInMemoryDb =
    configService.get<string>('USE_IN_MEMORY_DB') === 'true';

  const appModule = await AppModule.register(useInMemoryDb);

  const app = await NestFactory.create(appModule);

  SwaggerConfig.setup(app);

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `API Documentation is available on: http://localhost:${port}/api-docs`,
  );
  console.log(`${useInMemoryDb ? 'In-memory' : 'PostgreSQL'} database is used`);
}
bootstrap();
