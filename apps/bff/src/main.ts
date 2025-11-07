/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    const globalPrefix = AppModule.CONFIGURATION.GLOBAL_PREFIX || 'api';
    app.setGlobalPrefix(globalPrefix);
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.enableCors({
      origin: '*',
    });
    const port = AppModule.CONFIGURATION.APP_CONFIG.PORT || 8080;

    const config = new DocumentBuilder()
      .setTitle('Einvoice BFF API')
      .setDescription('The Einvoice BFF API description')
      .setVersion('1.0')
      .addTag('einvoice')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

    await app.listen(port);
    Logger.log(
      `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
    );
    Logger.log(
      `Swagger docs available at: http://localhost:${port}/${globalPrefix}/docs`
    );
  } catch (error) {
    Logger.error('Error starting application', error);
  }
}

bootstrap();
