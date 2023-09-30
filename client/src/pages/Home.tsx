import { Box, Container, Typography } from '@mui/material';
import { useHolidayStore } from '../store/holidays.store';
import { useEffect } from 'react';

const Home = () => {
  const holidays = useHolidayStore((state) => state.holidays);
  const getAll = useHolidayStore((state) => state.getAll);

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <Container>
      <Box>
        <Typography variant="h1" component={'h1'}>
          Home
        </Typography>

        {JSON.stringify(holidays)}
      </Box>
    </Container>
  );
};

export default Home;
