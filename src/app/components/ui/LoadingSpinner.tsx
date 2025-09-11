// src/components/ui/LoadingSpinner.tsx
import React from 'react';
import { cn } from '@/app/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
  xl: 'h-12 w-12',
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  text 
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        <svg
          className={cn(
            "animate-spin text-blue-600",
            sizeClasses[size],
            className
          )}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        {text && (
          <p className="text-sm text-gray-600">{text}</p>
        )}
      </div>
    </div>
  );
};

// Full page loading spinner
export const PageLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
};

// Inline loading spinner
export const InlineLoader: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="flex items-center justify-center py-4">
      <LoadingSpinner size="md" text={text} />
    </div>
  );
};

export { LoadingSpinner };