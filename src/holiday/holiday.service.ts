import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Holiday } from 'src/entities/holiday.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HolidayService {
  constructor(
    @InjectRepository(Holiday)
    private readonly holidayRepository: Repository<Holiday>,
    private readonly logger: Logger,
  ) {}

  async getAllHolidays(): Promise<Holiday[]> {
    this.logger.log('Fetching all holidays');
    return await this.holidayRepository.find();
  }

  async getHolidayById(id: number): Promise<Holiday> {
    return await this.holidayRepository.findOneBy({ id });
  }

  async createHoliday(holiday: Holiday): Promise<Holiday> {
    return await this.holidayRepository.save(holiday);
  }

  async updateHoliday(id: number, holiday: Holiday): Promise<Holiday> {
    await this.holidayRepository.update(id, holiday);
    return this.getHolidayById(id);
  }

  async deleteHoliday(id: number): Promise<void> {
    await this.holidayRepository.delete(id);
  }
}
