import { ValidationError, validate } from '@nestjs/class-validator';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUser } from 'src/common/types/user';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly logger: Logger,
    private jwtService: JwtService,
  ) {}

  async login({
    email,
    password,
  }: LoginUser): Promise<User & { access_token: string }> {
    // Fetch the user by email
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Compare the hashed password
    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Implement your JWT logic here, for now, just return a string
    const payload = { id: user.id, role: user.role };
    return {
      ...user,
      access_token: await this.jwtService.signAsync(payload),
    };
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

    // Hash the password
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await this.usersRepository.save(user);
  }
}
