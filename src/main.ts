import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { SwaggerConfig } from './modules/swagger/swagger.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerConfig.setup(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT', 4000);

  await app.listen(4000);
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(
    `API Documentation is available on: http://localhost:${port}/api-docs`,
  );
}
bootstrap();
