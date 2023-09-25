import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import logger from './utils/winston.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  // Access the ConfigService from the app instance
  const configService = app.get(ConfigService);

  // Retrieve the ENV and PORT from the ConfigService
  const environment = configService.get<string>('ENV');
  const port = configService.get<number>('PORT') || 3000; // default to 3000 if PORT is not set

  logger.log(`Environment: ${environment} - Port: ${port}`);

  // Setup Swagger documentation before the app starts listening for incoming connections
  const config = new DocumentBuilder()
    .setTitle('Trip API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(port);
}

bootstrap();
