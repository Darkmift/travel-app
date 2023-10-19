import { HolidayWithFollowData } from 'src/entities/holiday.entity';

export enum HOLIDAY_FILTER {
  NONE = 'none',
  IS_FOLLOWING = 'isFollowing',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
}

export interface HolidayPaginatedResponse {
  holidays: HolidayWithFollowData[];
  total: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
