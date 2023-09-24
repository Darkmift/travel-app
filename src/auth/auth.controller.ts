import { Controller, Post, Body, Logger, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDTO, RegisterUserDTO, User } from 'src/entities/user.entity';
import { ValidationError } from '@nestjs/class-validator';
import { HttpExceptionFilter } from 'src/common/filters/http-exception';
@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  login(@Body() loginUser: LoginUserDTO): string {
    return this.authService.login(loginUser);
  }

  @ApiBody({ type: RegisterUserDTO })
  @Post('register')
  @UseFilters(new HttpExceptionFilter())
  async register(@Body() user: User): Promise<void | ValidationError[]> {
    this.logger.log('Registering user', user);
    const errors = await this.authService.validateUser(user);
    if (errors && errors.length) throw errors;
    await this.authService.register(user);
  }
}
