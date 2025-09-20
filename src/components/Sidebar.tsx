import React from 'react';
import {
  TrendingUp,
  Settings,
  Home,
  LayoutList,
} from 'lucide-react';
import SidebarLink from './SidebarLink';

interface SidebarProps {
  selectedView: string;
}

const navigation = [
  { name: 'Overview', id: 'overview', icon: Home },
  { name: 'Dashboards', id: 'dashboards', icon: LayoutList },
  { name: 'Tracking', id: 'sentiment', icon: TrendingUp, premium: true },
];

const Sidebar: React.FC<SidebarProps> = ({ selectedView }) => {
  return (
    <div className="w-64 bg-white shadow-soft flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="text-xl font-bold text-gray-800">Project</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedView === item.id;

            return (
              <li key={item.id}>
                <SidebarLink
                  to={item.id === 'overview' ? '/' : `/${item.id}`}
                  icon={<Icon className="w-5 h-5 mr-3" />}
                  className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isSelected
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                >
                  {item.name}
                  {item.premium && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      Upgrade
                    </span>
                  )}
                </SidebarLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-200">
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
