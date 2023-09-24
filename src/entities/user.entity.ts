import { IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export abstract class AbstractEntity {
  @CreateDateColumn()
  @Exclude()
  public createdAt: Date;
}

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  public id: number;

  @Column()
  @IsNotEmpty({ message: 'First name is required' })
  @ApiProperty()
  first_name: string;

  @Column()
  @IsNotEmpty({ message: 'Last name is required' })
  @ApiProperty()
  last_name: string;

  @Column({ unique: true, nullable: false })
  @IsNotEmpty({ message: 'Email name is required' })
  @ApiProperty()
  email: string;

  @Column()
  @MinLength(5, {
    message:
      'Password is too short. Minimal length is $constraint1 characters, but actual is $value',
  })
  @ApiProperty()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @Exclude()
  role: UserRole;
}

export class LoginUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class RegisterUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  first_name: string;
}
