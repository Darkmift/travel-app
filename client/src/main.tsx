import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import MainAppRouter from './layout/Router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainAppRouter />
  </React.StrictMode>
);
