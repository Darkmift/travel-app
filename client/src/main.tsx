import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainAppRouter from './layout/Router';

import { mountStoreDevtool } from 'simple-zustand-devtools';
import { useAuthStore } from './store/auth.store';
import { useHolidayStore } from './store/holidays.store';

if (process.env.NODE_ENV === 'development') {
  mountStoreDevtool('Auth', useAuthStore);
  mountStoreDevtool('Holidays', useHolidayStore);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainAppRouter />
  </React.StrictMode>
);
