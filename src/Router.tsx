import React from 'react';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import routes from './routes';

const AppRoutes = () => useRoutes(routes);

const Router: React.FC = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default Router;
