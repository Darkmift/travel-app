import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus';

describe('AppController', () => {
  let appController: AppController;
  let mockHealthCheckService: Partial<HealthCheckService>;
  let mockHttpHealthIndicator: Partial<HttpHealthIndicator>;

  beforeEach(async () => {
    mockHealthCheckService = {
      check: jest.fn(),
    };
    mockHttpHealthIndicator = {
      pingCheck: jest.fn(),
    };

    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: HealthCheckService,
          useValue: mockHealthCheckService,
        },
        {
          provide: HttpHealthIndicator,
          useValue: mockHttpHealthIndicator,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('health', () => {
    it('should call health check', async () => {
      await appController.check();
      expect(mockHealthCheckService.check).toBeCalled();
    });
  });
});
