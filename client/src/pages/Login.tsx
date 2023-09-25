import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styled from 'styled-components';
import { useAuthStore } from '../store/auth.store'; // Import the useAuthStore

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

type Props = { className?: string };

const Login = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const login = useAuthStore((state) => state.login); // Get the login method from the auth store
  const user = useAuthStore((state) => state.user); // Get the login method from the auth store

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data.email, data.password); // Use the login method from the auth store
      console.log('Logged in successfully');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form className={props.className} onSubmit={handleSubmit(onSubmit)}>
      <h3>Login</h3>
      <div className="input-wrapper">
        <label htmlFor="email">Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span>{errors.email.message}</span>}

        <label htmlFor="password">Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <input type="submit" value="Login" />
      {JSON.stringify(user, null, 2)}
    </form>
  );
};

const StyledLogin = styled(Login)`
  display: flex;
  flex-direction: column;
  max-width: 500px;
  .input-wrapper {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  gap: 5px;
`;

export default StyledLogin;
