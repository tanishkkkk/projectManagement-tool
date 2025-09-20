import React from 'react';
import AppLayout from '../components/AppLayout';
import DashboardListing from '../components/DashboardListing';

const DashboardListingPage: React.FC = () => {
  return (
    <AppLayout>
      <DashboardListing />
    </AppLayout>
  );
};

export default DashboardListingPage;
