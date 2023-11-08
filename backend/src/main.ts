import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import logger from './utils/winston.util';
import * as serveStatic from 'serve-static';
import * as path from 'path';
import * as cors from 'cors'; // Make sure cors is installed.

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger });

  // Access the ConfigService from the app instance
  const configService = app.get(ConfigService);

  // Retrieve the ENV and PORT from the ConfigService
  const environment = configService.get<string>('ENV');
  const port = configService.get<number>('PORT') || 3000; // default to 3000 if PORT is not set

  logger.log(
    `Environment: ${environment} - Port: ${port} FRONTEND_URL: ${process.env.FRONTEND_URL}`,
  );

  // CORS configuration
  app.use(
    cors({
      origin: process.env.FRONTEND_URL, // use the FRONTEND_URL from the environment variables
      methods: '*', // allow all methods
      allowedHeaders: 'Content-Type, Authorization, Origin, Accept',
      credentials: true, // enable credentials for CORS requests
    }),
  );

  // Setup Swagger documentation before the app starts listening for incoming connections
  const config = new DocumentBuilder()
    .setTitle('Trip API')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Serve static files from the 'uploads' folder
  app.use('/uploads', serveStatic(path.join(__dirname, '..', 'uploads')));

  // Set up the Swagger Module
  SwaggerModule.setup('swagger', app, document);

  // Start listening for incoming requests
  await app.listen(port);
}

bootstrap();
