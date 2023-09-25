export const BASE_URL =
  import.meta.env.NODE_ENV === 'production' ? import.meta.env.VITE_API_URL : '/api';
export const TOKEN_LS_KEY = 'token';
