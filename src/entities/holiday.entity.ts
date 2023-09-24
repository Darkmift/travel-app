import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('holidays')
export class Holiday {
  @PrimaryGeneratedColumn()
  @ApiPropertyOptional()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  destination: string;

  @Column({ type: 'text' })
  @ApiProperty()
  description: string;

  @Column({ type: 'date' })
  @ApiProperty()
  start_date: Date;

  @Column({ type: 'date' })
  @ApiProperty()
  end_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty()
  price: number;

  @Column({ type: 'varchar', length: 255 })
  @ApiProperty()
  image_name: string;

  @ManyToMany(() => User)
  users: User[];
}
