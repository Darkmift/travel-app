import { ValidationError, validate } from '@nestjs/class-validator';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUser } from 'src/common/types/user';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}
  login({ email, password }: LoginUser): string {
    console.log(
      '🚀 ~ file: auth.service.ts:7 ~ AuthService ~ login ~ { email, password }:',
      { email, password },
    );
    // Stub: Implement your login logic here
    return `User with email ${email} logged in.`;
  }

  async validateUser(user: User): Promise<void | ValidationError[]> {
    const preValidatedUser = new User();
    Object.assign(preValidatedUser, user);
    const errors = await validate(preValidatedUser);
    if (!errors.length) return;
    this.logger.error({
      message: 'Validation failed for user:',
      errors,
      user,
    });
    return errors;
  }

  async register(user: User): Promise<void | ValidationError[]> {
    this.logger.log('Registering user', user);
    await this.usersRepository.save(user);
  }
}
