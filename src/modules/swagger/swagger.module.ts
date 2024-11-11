import { Module, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

@Module({})
export class SwaggerConfig {
  static setup(app: INestApplication): void {
    const config = new DocumentBuilder()
      .setTitle('API Documentation')
      .setDescription('API description and available endpoints')
      .setVersion('1.0')
      .addServer('http://localhost:4000/api-docs', 'Local development server')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    const reorderedDocument = reorderOpenApiDocument(document);

    const yamlDocument = yaml.dump(reorderedDocument);
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      'doc',
      'openapi.yaml',
    );
    fs.writeFileSync(filePath, yamlDocument);

    SwaggerModule.setup('api-docs', app, document);
  }
}

function reorderOpenApiDocument(document: any) {
  const { info, servers, components, paths } = document;

  return {
    openapi: '3.0.0',
    info,
    servers,
    components,
    paths,
  };
}
