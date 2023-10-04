import { validate } from '@nestjs/class-validator';
import { Injectable, Logger, ValidationError } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday, HolidayWithFollowData } from 'src/entities/holiday.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { HOLIDAY_FILTER } from './holiday.types';

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

  async getPaginatedHolidays1(
    page: number = 1,
    pageSize: number = 10,
    filter: HOLIDAY_FILTER,
    userId?: number,
  ): Promise<HolidayWithFollowData[]> {
    // Validate parameters
    if (!Number.isInteger(page) || page <= 0)
      throw new Error('Invalid page number');
    if (!Number.isInteger(pageSize) || pageSize <= 0)
      throw new Error('Invalid page size');
    if (!Object.values(HOLIDAY_FILTER).includes(filter))
      throw new Error('Invalid filter value');

    // Create the main query builder
    const query = this.holidayRepository
      .createQueryBuilder('holiday')
      .loadRelationCountAndMap('holiday.followerCount', 'holiday.followers')
      .leftJoinAndSelect('holiday.followers', 'follower');

    // Apply additional filters based on the filter parameter
    switch (filter) {
      case HOLIDAY_FILTER.IS_FOLLOWING:
        query.andWhere('follower.id = :userId', { userId });
        break;
      case HOLIDAY_FILTER.ONGOING:
        query.andWhere(
          'holiday.startDate <= CURRENT_DATE AND holiday.endDate >= CURRENT_DATE',
        );
        break;
      case HOLIDAY_FILTER.UPCOMING:
        query.andWhere('holiday.startDate > CURRENT_DATE');
        break;
    }

    // Paginate and order the results
    query
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .orderBy('holiday.id', 'ASC');

    // Execute the main query
    const holidays = await query.getMany();

    // Map the results to HolidayWithFollowData objects
    return holidays.map((holiday: HolidayWithFollowData) => {
      holiday.isFollowing = holiday.followers.some(
        (follower) => follower.id.toString() === userId.toString(),
      );
      delete holiday.followers;
      return holiday;
    });
  }

  async getPaginatedHolidays(
    page: number = 1,
    pageSize: number = 10,
    filter: HOLIDAY_FILTER,
    userId?: number,
  ): Promise<HolidayWithFollowData[]> {
    // Validate parameters
    if (!Number.isInteger(page) || page <= 0)
      throw new Error('Invalid page number');
    if (!Number.isInteger(pageSize) || pageSize <= 0)
      throw new Error('Invalid page size');
    if (!Object.values(HOLIDAY_FILTER).includes(filter))
      throw new Error('Invalid filter value');

    // Execute the stored procedure
    const rawHolidays = await this.holidayRepository.query(
      'CALL GetPaginatedHolidays(?, ?, ?, ?)',
      [page, pageSize, filter, userId],
    );

    // Map the raw results to your HolidayWithFollowData type
    const holidays: HolidayWithFollowData[] = rawHolidays[0].map(
      (rawHoliday: any) => {
        return {
          ...rawHoliday,
          followerCount: parseInt(rawHoliday.followerCount),
          isFollowing: !!parseInt(rawHoliday.isFollowing),
        };
      },
    );

    return holidays;
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

  async validateHoliday(holiday: Holiday): Promise<void | ValidationError[]> {
    holiday.price = parseFloat(holiday.price.toString());
    const preValidatedHoliday = new Holiday();
    Object.assign(preValidatedHoliday, holiday);
    const errors = await validate(preValidatedHoliday);
    if (!errors.length) return;
    this.logger.error({
      message: 'Validation failed for holiday:',
      errors,
      holiday,
    });
    return errors;
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

  async toggleFollowHoliday(id: number, userId: number): Promise<boolean> {
    // check if user is following holiday
    const holiday = await this.getHolidayById(id, userId);
    const isFollowing = holiday.isFollowing;

    const connection = this.holidayRepository.manager.connection;
    const queryRunner = connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (isFollowing) {
        // remove user from followers
        await queryRunner.manager
          .createQueryBuilder()
          .delete()
          .from('user_holidays_holidays')
          .where('holidaysId = :holidayId AND userId = :userId', {
            holidayId: id,
            userId,
          })
          .execute();
      } else {
        // add user to followers
        await queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into('user_holidays_holidays')
          .values({ holidaysId: id, userId })
          .execute();
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      // log error here
      this.logger.error('Error toggling follow status:', err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return !isFollowing;
  }

  async deleteHoliday(id: number): Promise<void> {
    await this.holidayRepository.delete(id);
  }
}
