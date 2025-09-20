import React, { useState, useCallback, useEffect } from 'react';
import OnboardingTour from './OnboardingTour';
import type { TourStep } from './OnboardingTour';
import { Play, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface OnboardingManagerProps {
  isFirstVisit?: boolean;
}

const OnboardingManager: React.FC<OnboardingManagerProps> = ({ isFirstVisit = false }) => {
  const [isTourOpen, setIsTourOpen] = useState(isFirstVisit);
  const [tourCompleted, setTourCompleted] = useState(false);
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [activeTasks, setActiveTasks] = useState<{[key: string]: boolean}>({
    viewDashboard: false,
    exploreSentiment: false,
    checkAlerts: false,
    reviewFeedback: false
  });

  // Calculate completion percentage
  const taskCount = Object.keys(activeTasks).length;
  const completedCount = Object.values(activeTasks).filter(Boolean).length;
  const completionPercentage = Math.round((completedCount / taskCount) * 100);

  const handleTaskComplete = useCallback((taskKey: string) => {
    setActiveTasks(prev => ({
      ...prev,
      [taskKey]: true
    }));
  }, []);

  // Static for now
  const onboardingSteps: TourStep[] = [
    {
      target: '.dashboard-main-heading',
      title: 'Welcome to Sentisum!',
      content: (
        <div>
          <p>This is your centralized dashboard for all customer feedback analytics. We'll show you around the key features to help you get started.</p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '.overview-cards',
      title: 'Key Metrics Overview',
      content: (
        <div>
          <p>These cards show your most important metrics at a glance. Track feedback volume, sentiment scores, and response rates all in one place.</p>
        </div>
      ),
      placement: 'bottom'
    },
    {
      target: '.sentiment-chart',
      title: 'Interactive Sentiment Analysis',
      content: (
        <div>
          <p>Understand customer sentiment at a glance. Toggle between different chart views to visualize your data in the most meaningful way.</p>
          <p className="mt-2 text-primary-600">Try clicking the chart icons to switch between views!</p>
        </div>
      ),
      placement: 'bottom',
      disableOverlay: true
    },
    {
      target: '.alerts-widget',
      title: 'Smart Alerts',
      content: (
        <div>
          <p>Never miss important changes in your feedback data. The system automatically detects anomalies and trends that need your attention.</p>
          <p className="mt-2 text-primary-600">Try clicking on view all to witness all alerts!</p>
        </div>
      ),
      placement: 'left'
    },
   
  ];

  const handleStepChange = useCallback((stepIndex: number) => {
    // Mark tasks as complete based on which step the user has seen
    if (stepIndex === 0) handleTaskComplete('viewDashboard');
    if (stepIndex === 2) handleTaskComplete('exploreSentiment');
    if (stepIndex === 3) handleTaskComplete('checkAlerts');
    if (stepIndex === 4) handleTaskComplete('reviewFeedback');
  }, [handleTaskComplete]);

  const handleTourComplete = useCallback(() => {
    setTourCompleted(true);
    // Mark all tasks as complete when user finishes the tour
    setActiveTasks({
      viewDashboard: true,
      exploreSentiment: true,
      checkAlerts: true,
      reviewFeedback: true
    });
  }, []);

  const restartTour = useCallback(() => {
    setIsTourOpen(true);
  }, []);

  // Set up auto-hide timer for the panel
  useEffect(() => {
    if (!isTourOpen && isPanelVisible && !isPanelMinimized) {
      const hideTimer = setTimeout(() => {
        setIsPanelMinimized(true);
      }, 5000); // 5 seconds

      return () => clearTimeout(hideTimer);
    }
  }, [isTourOpen, isPanelVisible, isPanelMinimized]);

 

  return (
    <>
      {/* Product Tour */}
      <OnboardingTour
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onComplete={handleTourComplete}
        steps={onboardingSteps}
        onStepChange={handleStepChange}
      />

     
      {!isTourOpen && isPanelVisible && (
        <div className="fixed bottom-6 right-6 z-30">
          <div 
            className={`
              absolute bottom-0 right-0
              w-11 h-11 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-50
              transition-all duration-300 ease-in-out
              ${isPanelMinimized ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
            `}
            onClick={() => {
              setIsPanelMinimized(false);
            }}
            title="Open getting started guide"
          >
            <ChevronUp className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary-600" />
          </div>
          <div 
            className={`
              bg-white rounded-lg shadow-lg overflow-hidden
              w-72 transition-all duration-300 ease-in-out transform origin-bottom-right
              ${isPanelMinimized ? 
                'opacity-0 scale-75 invisible pointer-events-none' : 
                'opacity-100 scale-100 visible'
              }
            `}
          
          >
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
                <h3 className="text-sm font-medium text-gray-700">Getting Started</h3>
                <div className="flex items-center space-x-2">
                  {!tourCompleted && (
                    <button 
                      onClick={restartTour}
                      className="px-3 py-1 text-xs bg-primary-500 text-white rounded hover:bg-primary-600 transition-colors flex items-center"
                    >
                      <Play size={12} className="mr-1" />
                      Tour
                    </button>
                  )}
                  <button 
                    onClick={() => setIsPanelMinimized(true)}
                    className="text-gray-400 hover:text-gray-600 transition-colors mr-1"
                    title="Minimize"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setIsPanelVisible(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    title="Close"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">Progress</span>
                  <span className="text-xs font-medium text-primary-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
                  <div 
                    className="bg-primary-500 h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className={`w-4 h-4 mr-2 ${activeTasks.viewDashboard ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={`text-xs ${activeTasks.viewDashboard ? 'text-gray-600 line-through' : 'text-gray-700'}`}>
                      Explore your dashboard
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`w-4 h-4 mr-2 ${activeTasks.exploreSentiment ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={`text-xs ${activeTasks.exploreSentiment ? 'text-gray-600 line-through' : 'text-gray-700'}`}>
                      View sentiment insights
                    </span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className={`w-4 h-4 mr-2 ${activeTasks.checkAlerts ? 'text-green-500' : 'text-gray-300'}`} />
                    <span className={`text-xs ${activeTasks.checkAlerts ? 'text-gray-600 line-through' : 'text-gray-700'}`}>
                      Check smart alerts
                    </span>
                  </li>
                 
                </ul>
                {completionPercentage === 100 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Congratulations! You've completed the basic onboarding.
                    </p>
                  </div>
                )}
              </div>
            </div>
        </div>
      )}
    </>
  );
};

export default OnboardingManager;
