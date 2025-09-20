
// import { RouteObject } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import DashboardListingPage from './pages/DashboardListingPage';
import NotFoundPage from './pages/NotFoundPage';

const routes = [
  {
    path: '/',
    element: <DashboardPage />,
  },
  {
    path: '/dashboards',
    element: <DashboardListingPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;
