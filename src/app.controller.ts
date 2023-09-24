import { Controller, Get, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
    private readonly logger: Logger,
  ) {}

  @Get()
  @ApiTags('General')
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags('Health')
  @Get('health')
  @HealthCheck()
  check() {
    this.logger.log('test', {
      message: 'Health check performed',
      meta: { timestamp: new Date().toISOString() },
    });
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com'),
    ]);
  }
}
