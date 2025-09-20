import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, icon, children, className }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary-50 text-primary-700 border border-primary-200'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
      } ${className}`}
    >
      {icon}
      <span className="ml-3">{children}</span>
    </Link>
  );
};

export default SidebarLink;
