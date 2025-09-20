import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedView] = useState('overview');
  return (
    <div className="flex h-screen w-full bg-gray-50">
      <Sidebar selectedView={selectedView} />
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
