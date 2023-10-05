export interface Holiday {
  id: number;
  destination: string;
  description: string;
  start_date: string;
  end_date: string;
  price: string;
  image_name: string;
  followerCount: number;
  isFollowing: boolean;
}

export enum HOLIDAY_FILTER {
  NONE = 'none',
  IS_FOLLOWING = 'isFollowing',
  ONGOING = 'ongoing',
  UPCOMING = 'upcoming',
}
