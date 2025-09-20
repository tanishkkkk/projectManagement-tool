import React from 'react';
import { TrendingUp, TrendingDown, Users, MessageSquare } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, icon }) => {
  return (
    <div className="bg-white rounded-xl shadow-soft p-6 hover:shadow-glow transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          <div className="flex items-center mt-2">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
            )}
            <span className={`text-sm font-medium ${
              isPositive ? 'text-green-600' : 'text-red-600'
            }`}>
              {change}
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last month</span>
          </div>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

const OverviewCards: React.FC = () => {
  const metrics = [
    {
      title: 'Overall Sentiment',
      value: '73%',
      change: '+5.2%',
      isPositive: true,
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Total Feedback',
      value: '12,847',
      change: '+12.4%',
      isPositive: true,
      icon: <MessageSquare className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Active Customers',
      value: '3,421',
      change: '+8.1%',
      isPositive: true,
      icon: <Users className="w-6 h-6 text-primary-600" />
    },
    {
      title: 'Response Rate',
      value: '89%',
      change: '-2.1%',
      isPositive: false,
      icon: <TrendingUp className="w-6 h-6 text-primary-600" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  );
};

export default OverviewCards;
