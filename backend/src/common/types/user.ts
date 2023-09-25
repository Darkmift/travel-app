import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDTO {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

export class RegisterUserDTO extends LoginUserDTO {
  @ApiProperty()
  username: string;
}

export class UserDTO {
  @ApiProperty()
  first_name: string;
  @ApiProperty()
  last_name: string;
  @ApiProperty()
  password?: string;
  @ApiProperty()
  username: string;
}

export type User = UserDTO;
export type LoginUser = LoginUserDTO;
