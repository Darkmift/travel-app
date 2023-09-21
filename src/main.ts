import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {
  const logger = WinstonModule.createLogger({
    level: 'debug', // The minimum level of messages to log.
    transports: [
      new winston.transports.File({
        filename: 'application.log', // The filename of the logfile to write to
        dirname: 'logs', // The directory to save log files
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.simple(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule, { logger });

  // Access the ConfigService from the app instance
  const configService = app.get(ConfigService);

  // Retrieve the ENV and PORT from the ConfigService
  const environment = configService.get<string>('ENV');
  const port = configService.get<number>('PORT') || 3000; // default to 3000 if PORT is not set

  console.log(`Environment: ${environment}`);
  console.log(`Port: ${port}`);

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
