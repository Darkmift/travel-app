import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

const mockUserRepository = {
  findOne: jest.fn(),
  save: jest.fn(),
};

const mockJwtService = {
  signAsync: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        Logger,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should return a user and access token if valid credentials are provided', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@test.com';
      mockUser.password = await bcrypt.hash('password', 10);

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      mockJwtService.signAsync.mockResolvedValue('some-access-token');

      const result = await service.login({
        email: 'test@test.com',
        password: 'password',
      });

      expect(result).toBeDefined();
      expect(result.access_token).toEqual('some-access-token');
    });

    it('should throw UnauthorizedException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(
        service.login({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow('Invalid email or password.');
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      const mockUser = new User();
      mockUser.id = 1;
      mockUser.email = 'test@test.com';
      mockUser.password = await bcrypt.hash('wrong-password', 10);

      mockUserRepository.findOne.mockResolvedValue(mockUser);

      await expect(
        service.login({ email: 'test@test.com', password: 'password' }),
      ).rejects.toThrow('Invalid email or password.');
    });
  });

  describe('validateUser', () => {
    // Add your test cases for validateUser here
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const mockUser = new User();
      mockUser.email = 'test@test.com';
      mockUser.password = 'password';

      mockUserRepository.save.mockResolvedValue(mockUser);

      const result = await service.register(mockUser);

      expect(result).toBeUndefined();
      expect(mockUserRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@test.com',
        }),
      );
    });

    // Add more test cases for failure scenarios, validation, etc.
  });
});
