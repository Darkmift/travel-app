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
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
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

  @ApiOperation({ summary: 'Get all holidays' })
  @ApiResponse({
    status: 200,
    description: 'Returns all holidays.',
    type: [Holiday],
  })
  @Get()
  async getAllHolidays(): Promise<Holiday[]> {
    this.logger.log('Getting all holidays');
    return await this.holidayService.getAllHolidays();
  }

  @ApiOperation({ summary: 'Get holiday by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the holiday by ID.',
    type: Holiday,
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getHolidayById(@Param('id') id: number): Promise<Holiday> {
    this.logger.log(`Getting holiday by id: ${id}`);
    return await this.holidayService.getHolidayById(id);
  }

  @ApiOperation({ summary: 'Create a new holiday' })
  @ApiResponse({
    status: 201,
    description: 'The holiday has been successfully created.',
    type: Holiday,
  })
  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Post()
  async createHoliday(@Body() holiday: Holiday): Promise<Holiday> {
    return await this.holidayService.createHoliday(holiday);
  }

  @ApiOperation({ summary: 'Update an existing holiday' })
  @ApiResponse({
    status: 200,
    description: 'The holiday has been successfully updated.',
    type: Holiday,
  })
  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateHoliday(
    @Param('id') id: number,
    @Body() holiday: Holiday,
  ): Promise<Holiday> {
    return await this.holidayService.updateHoliday(id, holiday);
  }

  @ApiOperation({ summary: 'Delete a holiday' })
  @ApiResponse({
    status: 200,
    description: 'The holiday has been successfully deleted.',
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteHoliday(@Param('id') id: number): Promise<void> {
    return await this.holidayService.deleteHoliday(id);
  }
}
