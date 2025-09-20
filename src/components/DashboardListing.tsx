import React from 'react';

interface DashboardItem {
  id: string;
  title: string;
  date: string;
  status: 'Active' | 'Inactive' | 'Draft';
}

const mockDashboards: DashboardItem[] = [
  { id: '1', title: 'Customer Feedback', date: '2025-09-15', status: 'Active' },
  { id: '2', title: 'Product Analytics', date: '2025-09-10', status: 'Inactive' },
  { id: '3', title: 'Support Trends', date: '2025-09-01', status: 'Draft' },
];

const statusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-green-600 bg-green-100';
    case 'Inactive': return 'text-gray-600 bg-gray-100';
    case 'Draft': return 'text-yellow-700 bg-yellow-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

const DashboardListing: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-xl shadow-soft p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">All Dashboards</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockDashboards.map((dashboard) => (
              <tr key={dashboard.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{dashboard.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dashboard.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(dashboard.status)}`}>{dashboard.status}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium">Fetch</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardListing;
