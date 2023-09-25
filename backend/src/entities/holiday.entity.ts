import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  @ApiProperty()
  destination: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  start_date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @ApiProperty()
  end_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  image_name: string;

  @ManyToMany(() => User, (user) => user.holidays)
  followers: User[];
}

export class HolidayWithFollowData extends Holiday {
  @ApiProperty()
  followerCount: number;

  @ApiProperty()
  isFollowing: boolean;
}
