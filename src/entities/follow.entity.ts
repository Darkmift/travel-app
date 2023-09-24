import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Holiday } from './holiday.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('follow')
export class Follow {
  @PrimaryColumn()
  @ApiPropertyOptional()
  userId: number;

  @PrimaryColumn()
  @ApiProperty()
  holidayId: number;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Holiday, (holiday) => holiday.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'holidayId' })
  holiday: Holiday;
}
