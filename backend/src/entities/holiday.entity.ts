import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  IsOptional,
} from '@nestjs/class-validator';
import { IsDateString } from '@nestjs/class-validator';
import { IsFile } from '../common/decorators/is-file';
import { Express } from 'express';

export const IMAGE_KEY = 'image-file';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  destination: string;

  @Column({ type: 'text' })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  start_date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  end_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  image_name: string;

  @ManyToMany(() => User, (user) => user.holidays)
  followers: User[];
}

export class HolidayDTO extends Holiday {
  @IsFile()
  @ApiPropertyOptional()
  imageFile: Express.Multer.File;
}

export class HolidayWithFollowData extends Holiday {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  followerCount: number;

  @ApiProperty()
  @IsOptional()
  isFollowing: boolean;
}
