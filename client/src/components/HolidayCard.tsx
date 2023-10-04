import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Holiday } from '../types';
import imageDefault from '../assets/images/image-default.jpg';
import { HOST_URL } from '../constants';
import { formatDate } from '../utils/formatDate';
import { useHolidayStore } from '../store/holidays.store';
import { useState } from 'react';

type Props = { holiday: Holiday };

function HolidayCard({ holiday }: Props) {
  const toggleFollow = useHolidayStore((state) => state.toggleFollow);
  const [disableFollowClick, setDisableFollowClick] = useState(false);
  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="140"
          image={
            holiday.image_name?.length
              ? HOST_URL + holiday.image_name.replace('.', '')
              : imageDefault
          }
          alt={holiday.destination}
        />
        <Typography
          color="white"
          sx={{
            position: 'absolute',
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            width: '100%',
            textAlign: 'left',
            paddingLeft: '8px',
            paddingBottom: '5px',
            paddingTop: '5px',
          }}
        >
          {holiday.destination.toLocaleUpperCase()}
        </Typography>
      </Box>
      <CardContent sx={{ flex: '1', padding: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Typography>{holiday.destination}</Typography>
        <Typography variant="body2" color="text.secondary">
          {holiday.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 'auto' }}>
          {formatDate(holiday.start_date)}&nbsp;&gt;&nbsp;{formatDate(holiday.end_date)}
        </Typography>
        <Chip
          label={`Followers: ${holiday.followerCount}`}
          color={holiday.isFollowing ? 'primary' : 'default'}
          disabled={disableFollowClick}
          onClick={() => {
            setDisableFollowClick(true);
            toggleFollow(holiday.id).then(() => setDisableFollowClick(false));
          }}
          size="small"
          sx={{ maxWidth: '33%' }}
        />
      </CardContent>
    </Card>
  );
}

export default HolidayCard;
