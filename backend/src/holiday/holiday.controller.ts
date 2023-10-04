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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBody,
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { HolidayService } from './holiday.service';
import {
  Holiday,
  HolidayDTO,
  HolidayWithFollowData,
  IMAGE_KEY,
} from 'src/entities/holiday.entity';
import { AuthGuard } from '../auth/auth.guard';
import { HttpExceptionFilter } from 'src/common/filters/http-exception';

// multer
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multer.config';
import { HOLIDAY_FILTER } from './holiday.types';

@ApiTags('Holidays')
@ApiBearerAuth()
@Controller('api/holiday')
@UseFilters(new HttpExceptionFilter())
export class HolidayController {
  constructor(
    private readonly holidayService: HolidayService,
    private readonly logger: Logger,
  ) {}
  /*
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
*/

  @ApiOperation({ summary: 'Get paginated holidays' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated holidays based on filter.',
  })
  @Get()
  async getPaginatedHolidays(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
    @Query('filter') filter: HOLIDAY_FILTER,
    @Query('userId') userId?: number,
  ): Promise<HolidayWithFollowData[]> {
    this.logger.log('Getting paginated holidays');
    return await this.holidayService.getPaginatedHolidays(
      parseInt(page),
      parseInt(pageSize),
      filter,
      userId,
    );
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
  @UseInterceptors(FileInterceptor(IMAGE_KEY, multerConfig))
  @UseFilters()
  async createHoliday(
    @Body() holiday: HolidayDTO,
    @Query('userId') userId?: number,
    @UploadedFile() imageFile?: Express.Multer.File,
  ): Promise<HolidayWithFollowData | void> {
    holiday.image_name = `${imageFile.destination}/${imageFile.filename}`;
    const errors = await this.holidayService.validateHoliday(holiday);
    if (errors && errors.length) throw errors;
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
    const errors = await this.holidayService.validateHoliday(holiday);
    if (errors && errors.length) throw errors;
    return await this.holidayService.updateHoliday(id, holiday, userId);
  }

  @ApiOperation({ summary: 'Toggle follow a holiday' })
  @ApiResponse({
    status: 200,
    description: 'The holiday has been successfully updated.',
  })
  @UseGuards(AuthGuard)
  @Put(':id/toggle-follow')
  async toggleFollowHoliday(
    @Param('id') id: number,
    @Query('userId') userId?: number,
  ): Promise<boolean> {
    return await this.holidayService.toggleFollowHoliday(id, userId);
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
