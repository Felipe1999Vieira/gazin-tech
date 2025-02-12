import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { Logger as PinoLogger } from 'nestjs-pino';

import { setupGlobalFilters, setupGlobalPipes } from './config/globals.config';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(PinoLogger));

  const logger = new Logger('Bootstrap');
  const config = app.get(ConfigService);

  const apiPrefix = config.get<string>('API_PREFIX');
  const port = config.get<number>('PORT');
  const env = config.get<string>('NODE_ENV');

  const docsURL = `${apiPrefix}/docs`;

  app.setGlobalPrefix(apiPrefix);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Teste Gazin Tech')
    .setDescription('API do teste Gazin Tech')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      description: 'API Token',
    })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(docsURL, app, document, {
    customSiteTitle: 'Swagger - Gazin Tech',
    customCss: '.models { display: none !important; }',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ limit: '1mb', extended: true }));

  app.enableCors();

  setupGlobalPipes({ app });
  setupGlobalFilters({ app });

  await app.listen(port, () => {
    logger.log(`Ambiente: ${env}`);
    logger.log(`Docs: http://localhost:${port}/${docsURL}`);
    logger.log(`API executando na porta ${port}`);
  });
}
bootstrap();
