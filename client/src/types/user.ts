export interface User {
  id?: number;
  password?: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'user' | 'admin';
}
