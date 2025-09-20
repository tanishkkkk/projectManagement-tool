import React from 'react';
import { Star, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface FeedbackItem {
  id: string;
  customer: string;
  feedback: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  topic: string;
  date: string;
  source: string;
}

const mockFeedback: FeedbackItem[] = [
  {
    id: '1',
    customer: 'Sarah Johnson',
    feedback: 'The product quality has improved significantly. Very happy with the recent updates.',
    sentiment: 'positive',
    score: 4.5,
    topic: 'Product Quality',
    date: '2 hours ago',
    source: 'Email'
  },
  {
    id: '2',
    customer: 'Mike Chen',
    feedback: 'Delivery was delayed and customer service was not helpful in resolving the issue.',
    sentiment: 'negative',
    score: 2.0,
    topic: 'Customer Service',
    date: '4 hours ago',
    source: 'Support Chat'
  },
  {
    id: '3',
    customer: 'Emma Wilson',
    feedback: 'The interface is okay, but could use some improvements in navigation.',
    sentiment: 'neutral',
    score: 3.0,
    topic: 'User Experience',
    date: '6 hours ago',
    source: 'Survey'
  },
  {
    id: '4',
    customer: 'David Brown',
    feedback: 'Excellent features and the pricing is very competitive. Highly recommend!',
    sentiment: 'positive',
    score: 5.0,
    topic: 'Pricing',
    date: '8 hours ago',
    source: 'Review'
  },
  {
    id: '5',
    customer: 'Lisa Garcia',
    feedback: 'The app crashes frequently and needs better stability.',
    sentiment: 'negative',
    score: 1.5,
    topic: 'Technical Issues',
    date: '10 hours ago',
    source: 'App Store'
  }
];

const getSentimentIcon = (sentiment: string) => {
  switch (sentiment) {
    case 'positive':
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    case 'negative':
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    default:
      return <Minus className="w-4 h-4 text-gray-500" />;
  }
};

const getSentimentBadge = (sentiment: string) => {
  const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
  switch (sentiment) {
    case 'positive':
      return `${baseClasses} bg-green-100 text-green-800`;
    case 'negative':
      return `${baseClasses} bg-red-100 text-red-800`;
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`;
  }
};

const FeedbackTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Feedback
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sentiment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Topic
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Source
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {mockFeedback.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="font-medium text-gray-900">{item.customer}</div>
              </td>
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                  {item.feedback}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  {getSentimentIcon(item.sentiment)}
                  <span className={getSentimentBadge(item.sentiment)}>
                    {item.sentiment}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-900">
                    {item.score}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 text-xs font-medium rounded-full">
                  {item.topic}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.source}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {item.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
