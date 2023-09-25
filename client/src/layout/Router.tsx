import { RouterProvider, Router, Route, RootRoute } from '@tanstack/react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Layout from './Layout';

const rootRoute = new RootRoute({
  component: Layout,
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
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
  return <RouterProvider router={router} />;
};

export default MainAppRouter;
