import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  Logger,
  UseFilters,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import { Holiday, HolidayWithFollowData } from 'src/entities/holiday.entity';
import { AuthGuard } from '../auth/auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception';

@ApiTags('Holidays')
@ApiBearerAuth()
@Controller('api/holiday')
@UseFilters(new HttpExceptionFilter())
export class HolidayController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly logger: Logger,
  ) {}

  @ApiOperation({ summary: 'Get all holidays' })
  @ApiResponse({
    status: 200,
    description: 'Returns all holidays.',
  })
  @Get()
  async getAllHolidays(
    @Query('userId') userId?: number,
  ): Promise<HolidayWithFollowData[]> {
    this.logger.log('Getting all holidays');
    return await this.holidayService.getAllHolidays(userId);
  }

  @ApiOperation({ summary: 'Get holiday by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the holiday by ID.',
  })
  @UseGuards(AuthGuard)
  @Get(':id')
  async getHolidayById(
    @Param('id') id: number,
    @Query('userId') userId?: number,
  ): Promise<HolidayWithFollowData> {
    this.logger.log(`Getting holiday by id: ${id}`);
    return await this.holidayService.getHolidayById(id, userId);
  }

  @ApiOperation({ summary: 'Create a new holiday' })
  @ApiResponse({
    status: 201,
    description: 'The holiday has been successfully created.',
  })
  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Post()
  async createHoliday(
    @Body() holiday: Holiday,
    @Query('userId') userId?: number,
  ): Promise<HolidayWithFollowData> {
    return await this.holidayService.createHoliday(holiday, userId);
  }

  @ApiOperation({ summary: 'Update an existing holiday' })
  @ApiResponse({
    status: 200,
    description: 'The holiday has been successfully updated.',
  })
  @ApiBody({ type: Holiday })
  @UseGuards(AuthGuard)
  @Put(':id')
  async updateHoliday(
    @Param('id') id: number,
    @Body() holiday: Holiday,
    @Query('userId') userId?: number,
  ): Promise<HolidayWithFollowData> {
    return await this.holidayService.updateHoliday(id, holiday, userId);
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
