import React, { useState } from 'react';
import { ArrowUpRight, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import AlertsModal from './AlertsModal';

interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  isNew: boolean;
  category?: string;
  source?: string;
}

const AlertsWidget: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const alerts: Alert[] = [
    {
      id: '1',
      type: 'urgent',
      message: 'Negative sentiment spike detected in Product Quality feedback',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      isNew: true,
      category: 'Product',
      source: 'Sentiment Analysis'
    },
    {
      id: '2',
      type: 'warning',
      message: 'Response rate dropped by 15% this week',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      isNew: false,
      category: 'Support',
      source: 'Metrics'
    },
    {
      id: '3',
      type: 'info',
      message: 'New feedback integration available: Shopify Reviews',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      isNew: false,
      category: 'Integration',
      source: 'System'
    }
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-l-4 border-red-500 bg-red-50';
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50';
      default:
        return 'border-l-4 border-blue-500 bg-blue-50';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Smart Alerts</h3>
        <button
          className="flex items-center text-primary-600 hover:text-primary-700 bg-transparent cursor-pointer transition-colors focus:outline-none group"
          onClick={openModal}
          aria-label="View all alerts"
        >
          <span className="text-sm font-medium mr-1 group-hover:underline transition-all">View all</span>
          <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

      {isModalOpen && <AlertsModal alerts={alerts} onClose={closeModal} />}

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div 
            key={alert.id}
            className={`p-4 rounded-lg ${getAlertStyle(alert.type)} hover:shadow-sm transition-shadow cursor-pointer relative`}
          >
            {alert.isNew && (
              <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            )}
            
            <div className="flex items-start space-x-3">
              {getAlertIcon(alert.type)}
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{alert.message}</p>
                <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(alert.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">AI-powered insights</span>
          <div className="flex items-center text-green-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-medium">+12% accuracy</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsWidget;
