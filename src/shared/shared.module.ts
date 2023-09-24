// shared.module.ts
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from 'src/entities/user.entity';
import { Holiday } from 'src/entities/holiday.entity';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Holiday]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  exports: [TypeOrmModule, JwtModule, ConfigModule],
})
export class SharedModule {}
