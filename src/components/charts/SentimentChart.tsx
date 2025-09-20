import React from 'react';
import { 
  PieChart, Pie, Cell, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  LineChart, Line,
  ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

const data = [
  { name: 'Positive', value: 65, color: '#10B981' },
  { name: 'Neutral', value: 25, color: '#6B7280' },
  { name: 'Negative', value: 10, color: '#EF4444' },
  
];

// Alternative data format for line/bar charts
const trendData = [
  { name: 'Mon', Positive: 55, Neutral: 28, Negative: 17 },
  { name: 'Tue', Positive: 60, Neutral: 32, Negative: 8 },
  { name: 'Wed', Positive: 45, Neutral: 30, Negative: 25 },
  { name: 'Thu', Positive: 70, Neutral: 20, Negative: 10 },
  { name: 'Fri', Positive: 65, Neutral: 25, Negative: 10 },
  { name: 'Sat', Positive: 75, Neutral: 20, Negative: 5 },
  { name: 'Sun', Positive: 80, Neutral: 15, Negative: 5 }
];

type ChartViewType = 'pie' | 'bar' | 'line';

interface SentimentChartProps {
  view?: ChartViewType;
}

const SentimentChart: React.FC<SentimentChartProps> = ({ view = 'pie' }) => {
  const renderChart = () => {
    switch (view) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} barGap={0}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
              <Bar dataKey="Positive" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Neutral" fill="#6B7280" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="Negative" fill="#EF4444" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
              <Line type="monotone" dataKey="Positive" stroke="#10B981" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Neutral" stroke="#6B7280" strokeWidth={2} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="Negative" stroke="#EF4444" strokeWidth={2} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      default: // pie chart
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="40%"
                innerRadius={60}
                outerRadius={90} 
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom"
                height={50}
                wrapperStyle={{ paddingTop: 20 }}
                formatter={(value) => <span className="text-sm font-medium">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="h-72"> 
      {renderChart()}
    </div>
  );
};

export default SentimentChart;
