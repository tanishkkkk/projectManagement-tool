import React, { useState } from 'react';
import OverviewCards from './OverviewCards';
import SentimentChart from './charts/SentimentChart';
import TrendChart from './charts/TrendChart';
import FeedbackTable from './FeedbackTable';
import AlertsWidget from './AlertsWidget';

const CHART_VIEWS = {
  PIE: 'pie',
  BAR: 'bar',
  LINE: 'line'
} as const;

type ChartViewType = typeof CHART_VIEWS[keyof typeof CHART_VIEWS];

const Dashboard: React.FC = () => {
  const [sentimentView, setSentimentView] = useState<ChartViewType>(CHART_VIEWS.BAR);

  return (
    <div className="flex h-screen w-full bg-gray-50">
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <main className="flex-1 overflow-y-auto p-6 xl:p-8 space-y-6 xl:space-y-8 w-full max-w-none dashboard-main-heading">
          {/* Overview Cards */}
          <div className="overview-cards">
            <OverviewCards />
          </div>
          
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-soft p-6 sentiment-chart">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  JIRA Overview
                </h3>
                <div className="flex items-center">
                  <button 
                    className={`p-1 transition-colors focus:outline-none`}
                    onClick={() => setSentimentView(CHART_VIEWS.PIE)}
                    title="Pie Chart View"
                    aria-label="Show as pie chart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                      className={`w-5 h-5 ${sentimentView === CHART_VIEWS.PIE ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                      <path fillRule="evenodd" d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button 
                    className={`p-1 transition-colors focus:outline-none`}
                    onClick={() => setSentimentView(CHART_VIEWS.BAR)}
                    title="Bar Chart View"
                    aria-label="Show as bar chart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                      className={`w-5 h-5 ${sentimentView === CHART_VIEWS.BAR ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                      <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
                    </svg>
                  </button>
                  <button 
                    className={`p-1 transition-colors focus:outline-none`}
                    onClick={() => setSentimentView(CHART_VIEWS.LINE)}
                    title="Line Chart View"
                    aria-label="Show as line chart"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" 
                      className={`w-5 h-5 ${sentimentView === CHART_VIEWS.LINE ? 'text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                      <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              <SentimentChart view={sentimentView} />
            </div>

            {/* Smart Alerts Widget */}
            <div className="alerts-widget">
              <AlertsWidget />
            </div>
          </div>

          {/* Trend Chart */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Sentiment Trends Over Time
            </h3>
            <TrendChart />
          </div>
          
          {/* Recent Feedback Table */}
          <div className="bg-white rounded-xl shadow-soft p-6 feedback-table">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Feedback
            </h3>
            <FeedbackTable />
          </div>
        </main>
        
        {/* Product Onboarding Tour */}
        {/* <OnboardingManager isFirstVisit={showOnboarding} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
