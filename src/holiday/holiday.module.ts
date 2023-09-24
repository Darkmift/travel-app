// holiday.module.ts
import { Module, Logger } from '@nestjs/common';
import { HolidayController } from './holiday.controller';
import { HolidayService } from './holiday.service';

@Module({
  controllers: [HolidayController],
  providers: [HolidayService, Logger],
})
export class HolidayModule {}
