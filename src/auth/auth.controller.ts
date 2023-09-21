import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO, RegisterUserDTO } from 'src/common/types/user';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: Logger,
  ) {}

  @ApiBody({ type: LoginUserDTO })
  @Post('login')
  login(@Body() loginUser: LoginUserDTO): string {
    // Use LoginUser type
    return this.authService.login(loginUser);
  }

  @ApiBody({ type: RegisterUserDTO })
  @Post('register')
  register(@Body() user: RegisterUserDTO): string {
    // Use User type
    this.logger.log('Registering user', user);
    return this.authService.register(user);
  }
}
