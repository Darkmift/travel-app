import {
  RouterProvider,
  Router,
  Route,
  RootRoute,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from './Layout';
import { useAuthStore } from '../store/auth.store';
import { useEffect } from 'react';
import { useHolidayStore } from '../store/holidays.store';

const rootRoute = new RootRoute({
  component: Layout,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
  beforeLoad: async () => {
    if (!useAuthStore.getState()?.user?.id) {
      throw redirect({
        to: '/login',
        search: {
          // Use the current location to power a redirect after login
          // (Do not use `router.state.resolvedLocation` as it can
          // potentially lag behind the actual current location)
          redirect: router.state.location.href,
        },
      });
    }
  },
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: Register,
});

const Logout = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  useEffect(() => {
    logout();
    navigate({ to: '/login' });
  }, []);
  return <></>;
};

const signOutRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/logout',
  component: Logout,
});

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, registerRoute, signOutRoute]);

const router = new Router({ routeTree });

const MainAppRouter = () => {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useHolidayStore.persist.rehydrate();
  }, []);

  return <RouterProvider router={router} />;
};

export default MainAppRouter;
