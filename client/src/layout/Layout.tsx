import { Link, Outlet } from '@tanstack/react-router';
import { useState } from 'react';
import styled from 'styled-components';
import { useAuthStore } from '../store/auth.store';

type Props = { className?: string };

const Layout = (props: Props) => {
  const user = useAuthStore((state) => state.user);
  const isRoleAdmin = useAuthStore((state) => state.isRoleAdmin());

  const [links] = useState<{ to: string; name: string; show: boolean }[]>([
    { to: '/', name: 'Home', show: !!user && !isRoleAdmin },
    { to: '/login', name: 'Login', show: !user },
    { to: '/register', name: 'Register', show: !user },
  ]);

  return (
    <div className={props.className}>
      <div className="links">
        {links
          .filter((link) => link.show)
          .map((link) => (
            <Link key={link.to} to={link.to}>
              {link.name}
            </Link>
          ))}
      </div>
      <Outlet />
    </div>
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
