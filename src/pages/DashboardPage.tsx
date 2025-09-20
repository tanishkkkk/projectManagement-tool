import React from 'react';
import AppLayout from '../components/AppLayout';
import Dashboard from '../components/Dashboard';
// import Dashboard from '../components/Dashboard';

const DashboardPage: React.FC = () => {
  return (
    <AppLayout>
      <Dashboard />
    </AppLayout>
  );
};

export default DashboardPage;
