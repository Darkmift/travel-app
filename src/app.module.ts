import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TerminusModule, HttpModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, Logger],
})
export class AppModule {}
