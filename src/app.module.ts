import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TerminusModule, HttpModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
