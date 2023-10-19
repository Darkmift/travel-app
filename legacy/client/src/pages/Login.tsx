import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '../store/auth.store';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from '@tanstack/react-router';
import { useSnackbarStore } from '../store/snackbar.store';

type LoginFormInputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

const Login = () => {
  const handleOpen = useSnackbarStore((state) => state.handleOpen);

  const login = useAuthStore((state) => state.login);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password);
      handleOpen({ message: 'Logged in successfully', severity: 'success' });
      await setTimeout(() => {}, 1000);
      navigate({ to: '/' });
    } catch (error) {
      console.error('Error logging in:', error);
      handleOpen({ message: `Login failed: ${(error as Error).message}`, severity: 'error' });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, p: 2 }}>
      <Typography variant="h5" gutterBottom component="div">
        Login
      </Typography>
      <TextField
        margin="normal"
        fullWidth
        id="email"
        label="Email"
        autoComplete="email"
        autoFocus
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>

      {JSON.stringify(user, null, 2)}
    </Box>
  );
};

export default Login;
