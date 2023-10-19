import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Typography,
} from '@mui/material';
import { useHolidayStore } from '../store/holidays.store';
import { useEffect } from 'react';
import HolidayCard from '../components/HolidayCard';
import { HOLIDAY_FILTER } from '../types/holiday';

const Home = () => {
  const holidays = useHolidayStore((state) => state.holidays);
  const page = useHolidayStore((state) => state.page);
  const pageSize = useHolidayStore((state) => state.pageSize);
  const getAll = useHolidayStore((state) => state.getAll);
  // const setPagination = useHolidayStore((state) => state.setPagination);

  useEffect(() => {
    getAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Box>
        <Typography variant="h3" component={'h1'}>
          Home
        </Typography>
        {/* add filters here */}

        <FormControl variant="outlined" style={{ margin: '20px 0' }}>
          <InputLabel id="filter-label">Filter</InputLabel>
          <Select
            labelId="filter-label"
            value={useHolidayStore((state) => state.filter)}
            onChange={(e) =>
              useHolidayStore
                .getState()
                .setPagination({ filter: e.target.value as HOLIDAY_FILTER, page: 1 })
            }
            label="Filter"
          >
            {Object.values(HOLIDAY_FILTER).map((filter) => (
              <MenuItem value={filter} key={filter}>
                {filter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={3}>
          {holidays.map((holiday) => (
            <Grid item xs={12} sm={6} md={4} key={holiday.id}>
              <HolidayCard key={holiday.id} holiday={holiday}></HolidayCard>
            </Grid>
          ))}
        </Grid>
        {/* add pagination bar here */}

        <Pagination
          count={Math.ceil(useHolidayStore((state) => state.total) / pageSize)}
          page={page}
          onChange={(_, value) => useHolidayStore.getState().setPagination({ page: value })}
          style={{ margin: '20px 0' }}
        />
      </Box>
    </Container>
  );
};

export default Home;
