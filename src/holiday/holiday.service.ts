import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from 'src/entities/holiday.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly logger: Logger,
  ) {}

  private getHolidayWithExtras(userId?: number): SelectQueryBuilder<Holiday> {
    return this.holidayRepository
      .createQueryBuilder('holiday')
      .select('holiday.*') // Select all columns from holiday
      .leftJoin('user_holidays_holidays', 'uhh', 'uhh.holidaysId = holiday.id') // Note the column name
      .leftJoin('user', 'follower', 'follower.id = uhh.userId') // Note the column name
      .addSelect('COUNT(follower.id)', 'followerCount')
      .addSelect(
        'SUM(CASE WHEN follower.id = :userId THEN 1 ELSE 0 END)',
        'isFollowing',
      )
      .setParameter('userId', userId)
      .groupBy('holiday.id');
  }

  async getAllHolidays(userId?: number): Promise<any[]> {
    this.logger.log('Fetching all holidays');
    return await this.getHolidayWithExtras(userId).getRawMany();
  }

  async getHolidayById(id: number, userId?: number): Promise<any> {
    return await this.getHolidayWithExtras(userId)
      .andWhere('holiday.id = :id', { id })
      .getRawOne();
  }

  async createHoliday(holiday: Holiday, userId?: number): Promise<any> {
    const newHoliday = await this.holidayRepository.save(holiday);
    return this.getHolidayById(newHoliday.id, userId);
  }

  async updateHoliday(
    id: number,
    holiday: Holiday,
    userId?: number,
  ): Promise<any> {
    await this.holidayRepository.update(id, holiday);
    return this.getHolidayById(id, userId);
  }

  async deleteHoliday(id: number): Promise<void> {
    await this.holidayRepository.delete(id);
  }
}
