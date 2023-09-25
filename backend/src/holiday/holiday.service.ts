import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday, HolidayWithFollowData } from 'src/entities/holiday.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly logger: Logger,
  ) {}

  private getHolidayWithFollowData(
    userId?: number,
  ): SelectQueryBuilder<Holiday> {
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

  private castHolidayWithFollowData(
    holiday: HolidayWithFollowData,
  ): HolidayWithFollowData {
    holiday.followerCount = parseInt(holiday.followerCount.toString());
    holiday.isFollowing = !!parseInt(holiday.followerCount.toString());
    return holiday;
  }

  async getAllHolidays(userId?: number): Promise<HolidayWithFollowData[]> {
    this.logger.log('Fetching all holidays');
    return (await this.getHolidayWithFollowData(userId).getRawMany()).map(
      this.castHolidayWithFollowData,
    ) as HolidayWithFollowData[];
  }

  async getHolidayById(
    id: number,
    userId?: number,
  ): Promise<HolidayWithFollowData> {
    return await this.getHolidayWithFollowData(userId)
      .andWhere('holiday.id = :id', { id })
      .getRawOne()
      .then(this.castHolidayWithFollowData);
  }

  async createHoliday(
    holiday: Holiday,
    userId?: number,
  ): Promise<HolidayWithFollowData> {
    const newHoliday = await this.holidayRepository.save(holiday);
    return this.getHolidayById(newHoliday.id, userId);
  }

  async updateHoliday(
    id: number,
    holiday: Holiday,
    userId?: number,
  ): Promise<HolidayWithFollowData> {
    await this.holidayRepository.update(id, holiday);
    return this.getHolidayById(id, userId);
  }

  async deleteHoliday(id: number): Promise<void> {
    await this.holidayRepository.delete(id);
  }
}
