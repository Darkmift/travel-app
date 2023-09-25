import { RouterProvider, Router, Route, RootRoute, redirect } from '@tanstack/react-router';
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

const routeTree = rootRoute.addChildren([homeRoute, loginRoute, registerRoute]);

const router = new Router({ routeTree });

const MainAppRouter = () => {
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    useHolidayStore.persist.rehydrate();
  }, []);

  return <RouterProvider router={router} />;
};

export default MainAppRouter;
