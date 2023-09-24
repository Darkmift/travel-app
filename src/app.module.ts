import { HolidayModule } from './holiday/holiday.module';
import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
// import TypeOrmCustomLogger from './utils/typeorm-logger.util';

@Module({
  imports: [
    HolidayModule,
    TerminusModule,
    HttpModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        // entities: [__dirname + '/*.entity.{js,ts}'],
        autoLoadEntities: true,
        synchronize: configService.get<boolean>('TYPEORM_SYNC'),
        logging:
          configService.get<string>('ENV') === 'development' ? true : false,
        // logging: ['query', 'error', 'schema', 'log', 'info', 'warn'],
        // logger: new TypeOrmCustomLogger(new Logger()), //not working see: https://github.com/typeorm/typeorm/issues/10174
      }),
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
