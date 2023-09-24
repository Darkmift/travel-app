import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import { Holiday } from 'src/entities/holiday.entity';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Holidays')
@ApiBearerAuth()
@Controller('api/holidays')
export class HolidayController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly logger: Logger,
  ) {}

  @Get()
  async getAllHolidays(): Promise<Holiday[]> {
    this.logger.log('Getting all holidays');
    return await this.holidayService.getAllHolidays();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getHolidayById(@Param('id') id: number): Promise<Holiday> {
    this.logger.log(`Getting holiday by id: ${id}`);
    return await this.holidayService.getHolidayById(id);
  }

  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Post()
  async createHoliday(@Body() holiday: Holiday): Promise<Holiday> {
    return await this.holidayService.createHoliday(holiday);
  }

  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateHoliday(
    @Param('id') id: number,
    @Body() holiday: Holiday,
  ): Promise<Holiday> {
    return await this.holidayService.updateHoliday(id, holiday);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHoliday(@Param('id') id: number): Promise<void> {
    return await this.holidayService.deleteHoliday(id);
  }
}
