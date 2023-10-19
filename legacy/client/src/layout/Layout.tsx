import { Link, Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/auth.store';
import { Box, Container } from '@mui/material';
import AppSnackBar from '../components/AppSanckBar';
import { useSnackbarStore } from '../store/snackbar.store';

type Props = { className?: string };
type LinkMeta = { to: string; name: string; show: boolean };

const Layout = (props: Props) => {
  const user = useAuthStore((state) => state.user);
  const isRoleAdmin = useAuthStore((state) => state.isRoleAdmin());
  const open = useSnackbarStore((state) => state.open);

  const [links, setLinks] = useState<LinkMeta[]>([]);

  useEffect(() => {
    setLinks(() => [
      { to: '/', name: 'Home', show: !!user && !isRoleAdmin },
      { to: '/login', name: 'Login', show: !user },
      { to: '/register', name: 'Register', show: !user },
      { to: '/logout', name: 'Sign out', show: !!user },
    ]);
  }, [user, isRoleAdmin]);

  return (
    <Container className={props.className}>
      <Box className="links">
        {links
          .filter((link) => link.show)
          .map((link) => (
            <Link key={link.to} to={link.to}>
              {link.name}
            </Link>
          ))}
      </Box>
      <Outlet />

      {open && <AppSnackBar />}
    </Container>
  );
};

const StyledLayout = styled(Layout)`
  display: flex;
  flex-direction: column;
  .links {
    display: flex;
    gap: 1rem;
  }
`;

export default StyledLayout;
