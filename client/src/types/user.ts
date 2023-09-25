export interface User {
  id?: number;
  password?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
}
