import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, Filter, X, Search, Bell, CalendarDays } from 'lucide-react';

interface Alert {
  id: string;
  type: 'urgent' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  isNew: boolean;
  category?: string;
  source?: string;
}

interface AlertsModalProps {
  alerts: Alert[];
  onClose: () => void;
}

const AlertsModal: React.FC<AlertsModalProps> = ({ alerts: initialAlerts, onClose }) => {
  // Using static data for now
  const [alerts, setAlerts] = useState<Alert[]>([
    ...initialAlerts,
    {
      id: '4',
      type: 'urgent',
      message: 'Critical security update required for customer data protection',
      timestamp: new Date(Date.now() - 10 * 60 * 1000),
      isNew: true,
      category: 'Security',
      source: 'System'
    },
    {
      id: '5',
      type: 'info',
      message: 'New customer feedback trend detected in Customer Support channel',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      isNew: false,
      category: 'Feedback',
      source: 'Customer Support'
    },
    {
      id: '6',
      type: 'warning',
      message: 'Social media sentiment dropping for product feature launch',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
      isNew: false,
      category: 'Social Media',
      source: 'Twitter'
    },
    {
      id: '7',
      type: 'info',
      message: 'New integration with Intercom available for setup',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      isNew: false,
      category: 'Integration',
      source: 'System'
    },
    {
      id: '8',
      type: 'warning',
      message: 'Customer satisfaction score decreased by 5% this week',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isNew: false,
      category: 'Metrics',
      source: 'Analytics'
    },
    {
      id: '9',
      type: 'urgent',
      message: 'Data processing pipeline experiencing delays',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isNew: true,
      category: 'System',
      source: 'Infrastructure'
    }
  ]);
  
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
  
  const categories = Array.from(new Set(alerts.map(alert => alert.category || 'Uncategorized')));

  // Alert type configuration for icons and styling
  const alertTypes = [
    { 
      id: 'all', 
      label: 'All Alerts', 
      icon: <Bell className="w-3 h-3 text-gray-500" />,
      bgColor: 'bg-gray-100'
    },
    { 
      id: 'urgent', 
      label: 'Urgent', 
      icon: <AlertTriangle className="w-3 h-3 text-red-500" />,
      bgColor: 'bg-red-100'
    },
    { 
      id: 'warning', 
      label: 'Warning', 
      icon: <Clock className="w-3 h-3 text-yellow-500" />,
      bgColor: 'bg-yellow-100'
    },
    { 
      id: 'info', 
      label: 'Info', 
      icon: <CheckCircle className="w-3 h-3 text-blue-500" />,
      bgColor: 'bg-blue-100'
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
  
  // Render a reusable filter button
  const renderFilterButton = (id: string, label: string, icon: React.ReactNode, bgColor: string) => {
    return (
      <button 
        key={id}
        className={`w-full text-left px-3.5 py-2 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${filter === id ? 'bg-primary-50 text-primary-700' : ''}`}
        onClick={() => handleFilterChange(id)}
      >
        <span className="flex items-center gap-2">
          <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full ${bgColor}`}>
            {icon}
          </span>
          {label}
        </span>
        {filter === id && (
          <CheckCircle className="w-4 h-4 text-primary-500" />
        )}
      </button>
    );
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setIsFilterMenuOpen(false);
  };

  const handleSort = () => {
    setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest');
  };

  const filteredAlerts = alerts
    .filter(alert => {
      if (filter === 'all') return true;
      if (filter === 'urgent' || filter === 'warning' || filter === 'info') {
        return alert.type === filter;
      }
      return alert.category === filter;
    })
    .filter(alert => 
      alert.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (alert.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (alert.source || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return b.timestamp.getTime() - a.timestamp.getTime();
      }
      return a.timestamp.getTime() - b.timestamp.getTime();
    });
    
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative mx-4 my-8 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800">All Alerts</h3>
          <button
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by message, category or source..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300 text-sm transition-all duration-150"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setSearchTerm('')}
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <button 
                className={`flex items-center justify-between gap-2 px-3.5 py-2 border ${isFilterMenuOpen ? 'border-primary-400 bg-primary-50' : 'border-gray-200'} rounded-lg hover:bg-gray-50 text-sm font-medium min-w-[140px] transition-all duration-150 group focus:outline-none focus:ring-2 focus:ring-primary-200`}
                onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
                aria-haspopup="true"
                aria-expanded={isFilterMenuOpen}
              >
                <span className="flex items-center gap-2">
                  <Filter className={`w-4 h-4 ${isFilterMenuOpen ? 'text-primary-500' : 'text-gray-500'} transition-colors`} /> 
                  <span className={`${filter !== 'all' ? 'text-primary-600 font-semibold' : ''}`}>
                    {filter === 'all' ? 'All Alerts' : filter}
                  </span>
                </span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`w-4 h-4 transition-transform duration-200 ${isFilterMenuOpen ? 'rotate-180 text-primary-500' : 'text-gray-500'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isFilterMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsFilterMenuOpen(false)}
                    aria-hidden="true"
                  ></div>
                  
                  <div className="absolute top-full mt-1 right-0 z-20 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-[220px] max-h-[320px] overflow-y-auto animate-fadeIn">
                    <div className="sticky top-0 px-3 pb-1.5 pt-1 mb-1 border-b border-gray-100 bg-white">
                      <p className="text-xs text-gray-500 font-medium">Alert Types</p>
                    </div>
                    
                    {/* Render all alert type filter buttons */}
                    {alertTypes.map(({ id, label, icon, bgColor }) => 
                      renderFilterButton(id, label, icon, bgColor)
                    )}
                    
                    {categories.length > 0 && (
                      <>
                        <div className="sticky top-0 px-3 pt-2.5 pb-1.5 mt-1 mb-1 border-b border-t border-gray-100 bg-white">
                          <p className="text-xs text-gray-500 font-medium">Categories</p>
                        </div>
                        {categories.map(category => 
                          renderFilterButton(
                            category,
                            category,
                            <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>,
                            'bg-gray-100'
                          )
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
            
            <button 
              className="flex items-center gap-2 px-3.5 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary-200"
              onClick={handleSort}
              title={sortOrder === 'newest' ? 'Oldest first' : 'Newest first'}
            >
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <span>{sortOrder === 'newest' ? 'Newest' : 'Oldest'}</span>
              </span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ml-1 ${sortOrder !== 'newest' ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-500">
            <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-4">
              <Bell className="w-8 h-8 opacity-50" />
            </div>
            <p className="text-gray-600 font-medium">No alerts match your filters</p>
            <p className="text-sm text-gray-500 mt-1 mb-3">Try changing your search or filter criteria</p>
            <button 
              className="px-4 py-2 bg-primary-50 text-primary-600 font-medium rounded-lg hover:bg-primary-100 transition-colors"
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="space-y-3 overflow-y-auto flex-1 pr-1">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-4 rounded-lg ${
                  alert.type === 'urgent'
                    ? 'border-l-4 border-red-500 bg-red-50'
                    : alert.type === 'warning'
                    ? 'border-l-4 border-yellow-500 bg-yellow-50'
                    : 'border-l-4 border-blue-500 bg-blue-50'
                } hover:shadow-md transition-all duration-200 ${alert.isNew ? 'ring-1 ring-gray-200' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${alert.isNew ? 'text-gray-900' : 'text-gray-800'}`}>
                      {alert.message}
                      {alert.isNew && (
                        <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1 animate-pulse"></span>
                          New
                        </span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2 items-center">
                      <span className="text-xs text-gray-500 flex items-center">
                        <CalendarDays className="w-3.5 h-3.5 mr-1 text-gray-400" />
                        {formatDate(alert.timestamp)}
                      </span>
                      {alert.category && (
                        <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                          {alert.category}
                        </span>
                      )}
                      {alert.source && (
                        <span className="px-2 py-0.5 bg-white border border-gray-200 rounded-full text-xs font-medium text-gray-600">
                          {alert.source}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-5 pt-4 border-t border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
            <span className="text-sm font-medium text-gray-700">{filteredAlerts.length} alert{filteredAlerts.length !== 1 ? 's' : ''} found</span>
          </div>
          <button 
            className="inline-flex items-center px-3.5 py-2 text-sm text-primary-600 hover:text-primary-700 font-medium bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200"
            onClick={() => {
              setAlerts(prev => prev.map(a => ({ ...a, isNew: false })));
            }}
          >
            <CheckCircle className="w-4 h-4 mr-1.5" />
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsModal;
