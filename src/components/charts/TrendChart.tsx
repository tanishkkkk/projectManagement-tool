import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { date: 'Jan 1', positive: 65, negative: 10, neutral: 25 },
  { date: 'Jan 8', positive: 68, negative: 12, neutral: 20 },
  { date: 'Jan 15', positive: 72, negative: 8, neutral: 20 },
  { date: 'Jan 22', positive: 70, negative: 15, neutral: 15 },
  { date: 'Jan 29', positive: 75, negative: 10, neutral: 15 },
  { date: 'Feb 5', positive: 73, negative: 12, neutral: 15 },
  { date: 'Feb 12', positive: 78, negative: 8, neutral: 14 },
  { date: 'Feb 19', positive: 76, negative: 11, neutral: 13 },
  { date: 'Feb 26', positive: 80, negative: 7, neutral: 13 }
];

const TrendChart: React.FC = () => {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            stroke="#6B7280"
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            stroke="#6B7280"
            label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="positive" 
            stroke="#10B981" 
            strokeWidth={3}
            dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            name="Positive"
          />
          <Line 
            type="monotone" 
            dataKey="negative" 
            stroke="#EF4444" 
            strokeWidth={3}
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            name="Negative"
          />
          <Line 
            type="monotone" 
            dataKey="neutral" 
            stroke="#6B7280" 
            strokeWidth={3}
            dot={{ fill: '#6B7280', strokeWidth: 2, r: 4 }}
            name="Neutral"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrendChart;
