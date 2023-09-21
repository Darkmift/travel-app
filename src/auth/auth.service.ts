import { Injectable } from '@nestjs/common';
import { LoginUser, User } from 'src/common/types/user';

@Injectable()
export class AuthService {
  login({ email, password }: LoginUser): string {
    console.log(
      '🚀 ~ file: auth.service.ts:7 ~ AuthService ~ login ~ { email, password }:',
      { email, password },
    );
    // Stub: Implement your login logic here
    return `User with email ${email} logged in.`;
  }

  register({ email, password, username }: User): string {
    console.log(
      '🚀 ~ file: auth.service.ts:12 ~ AuthService ~ register ~ { email, password, username }:',
      { email, password, username },
    );
    // Stub: Implement your registration logic here
    return `User with email ${email} and username ${username} registered.`;
  }
}
