import { Box, Container, Grid, Typography } from '@mui/material';
import { useHolidayStore } from '../store/holidays.store';
import { useEffect } from 'react';
import HolidayCard from '../components/HolidayCard';

const Home = () => {
  const holidays = useHolidayStore((state) => state.holidays);
  const getAll = useHolidayStore((state) => state.getAll);

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <Container>
      <Box>
        <Typography variant="h3" component={'h1'}>
          Home
        </Typography>
        <Grid container spacing={3}>
          {holidays.map((holiday) => (
            <Grid item xs={12} sm={6} md={4} key={holiday.id}>
              <HolidayCard key={holiday.id} holiday={holiday}></HolidayCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
