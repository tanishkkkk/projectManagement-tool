import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

export type TourStep = {
  target: string; 
  title: string;
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  disableOverlay?: boolean;
  disableBeacon?: boolean;
};

interface OnboardingTourProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
  steps: TourStep[];
  onStepChange?: (stepIndex: number) => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({
  isOpen,
  onClose,
  onComplete,
  steps,
  onStepChange
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [tooltipPlacement, setTooltipPlacement] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');

  const currentStep = steps[currentStepIndex];
  
  useEffect(() => {
    if (!isOpen) return;
    
    const updateTargetElement = () => {
      const element = document.querySelector(currentStep.target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        positionTooltip(element, currentStep.placement || 'bottom');
      }
    };

    updateTargetElement();
    window.addEventListener('resize', updateTargetElement);
    
    return () => {
      window.removeEventListener('resize', updateTargetElement);
    };
  }, [isOpen, currentStep]);

  useEffect(() => {
    if (onStepChange) {
      onStepChange(currentStepIndex);
    }
  }, [currentStepIndex, onStepChange]);

  const positionTooltip = (element: HTMLElement, placement: 'top' | 'bottom' | 'left' | 'right') => {
    const rect = element.getBoundingClientRect();
    const tooltipWidth = 320;
    const tooltipHeight = 180;
    const margin = 15; 
    
    let top = 0;
    let left = 0;
    let actualPlacement = placement;

    // Checking space
    switch (placement) {
      case 'top':
        if (rect.top < tooltipHeight + margin) {
          actualPlacement = 'bottom';
        }
        break;
      case 'bottom':
        if (window.innerHeight - rect.bottom < tooltipHeight + margin) {
          actualPlacement = 'top';
        }
        break;
      case 'left':
        if (rect.left < tooltipWidth + margin) {
          actualPlacement = 'right';
        }
        break;
      case 'right':
        if (window.innerWidth - rect.right < tooltipWidth + margin) {
          actualPlacement = 'left';
        }
        break;
    }

    // Calculate position based on final placement
    switch (actualPlacement) {
      case 'top':
        top = rect.top - tooltipHeight - margin;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'bottom':
        top = rect.bottom + margin;
        left = rect.left + (rect.width / 2) - (tooltipWidth / 2);
        break;
      case 'left':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.left - tooltipWidth - margin;
        break;
      case 'right':
        top = rect.top + (rect.height / 2) - (tooltipHeight / 2);
        left = rect.right + margin;
        break;
    }

    // Make sure the tooltip stays within viewport
    if (left < 20) left = 20;
    if (left + tooltipWidth > window.innerWidth - 20) {
      left = window.innerWidth - tooltipWidth - 20;
    }
    
    if (top < 20) top = 20;
    if (top + tooltipHeight > window.innerHeight - 20) {
      top = window.innerHeight - tooltipHeight - 20;
    }

    setTooltipPosition({ top, left });
    setTooltipPlacement(actualPlacement);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen || !targetElement) return null;

  return (
    <>
      {/* Overlay */}
      {!currentStep.disableOverlay && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 pointer-events-auto"
          onClick={handleSkip}
        />
      )}

      {/* Target highlight */}
      <div
        className="absolute z-40 pointer-events-none"
        style={{
          top: targetElement.getBoundingClientRect().top - 4,
          left: targetElement.getBoundingClientRect().left - 4,
          width: targetElement.offsetWidth + 8,
          height: targetElement.offsetHeight + 8,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
          borderRadius: '4px',
          border: '2px solid #3b82f6'
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-lg w-80 pointer-events-auto"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transformOrigin: tooltipPlacement === 'top' ? 'center bottom' : 
                           tooltipPlacement === 'bottom' ? 'center top' : 
                           tooltipPlacement === 'left' ? 'right center' : 'left center'
        }}
      >
        {/* Tooltip Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-800">{currentStep.title}</h3>
          <button 
            className="text-gray-400 hover:text-gray-600 focus:outline-none bg-transparent"
            onClick={handleSkip}
            aria-label="Close tour"
          >
            <X size={18}  />
          </button>
        </div>
        
        {/* Tooltip Content */}
        <div className="px-4 py-3 text-sm text-gray-600">
          {currentStep.content}
        </div>
        
        {/* Tooltip Footer */}
                  <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200">
          <div className="flex items-center space-x-1.5">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${index === currentStepIndex ? 'bg-primary-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
          <div className="flex items-center space-x-3">
            {currentStepIndex > 0 && (
              <button
                className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50 rounded-md border border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center"
                onClick={handlePrev}
              >
                <ChevronLeft size={16} className="mr-1" />
                Back
              </button>
            )}
            <button
              className={`px-4 py-1.5 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 text-sm font-medium transition-all duration-200 flex items-center ${
                currentStepIndex < steps.length - 1 
                  ? 'bg-primary-500 hover:bg-primary-600 focus:ring-primary-300'
                  : 'bg-green-500 hover:bg-green-600 focus:ring-green-300'
              }`}
              onClick={handleNext}
            >
              {currentStepIndex < steps.length - 1 ? (
                <>
                  Next
                  <ChevronRight size={16} className="ml-1" />
                </>
              ) : (
                <>
                  Finish
                  <Check size={16} className="ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
