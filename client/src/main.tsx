import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainAppRouter from './layout/Router';

import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useAuthStore } from './store/auth.store';
import { useHolidayStore } from './store/holidays.store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './layout/theme';
import { useSnackbarStore } from './store/snackbar.store';

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('SanckBar', useSnackbarStore);
  mountStoreDevtool('Auth', useAuthStore);
  mountStoreDevtool('Holidays', useHolidayStore);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainAppRouter />
    </ThemeProvider>
  </React.StrictMode>
);
