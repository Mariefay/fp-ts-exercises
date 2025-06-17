'use client';

import React from 'react';

interface ProgressRingProps {
  completed: number;
  total: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
}

export function ProgressRing({ completed, total, size = 'medium', showLabel = true }: ProgressRingProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
  
  const sizeClasses = {
    small: 'w-16 h-16',
    medium: 'w-24 h-24',
    large: 'w-32 h-32',
  };
  
  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-lg',
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="progress-ring w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-gray-200"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            className="text-primary-500 progress-ring-circle"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`font-bold text-gray-900 ${textSizes[size]}`}>
              {percentage}%
            </div>
            {size === 'large' && (
              <div className="text-xs text-gray-500 mt-1">
                {completed}/{total}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {showLabel && (
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">Overall Progress</div>
          <div className="text-sm text-gray-600">
            {completed} of {total} exercises completed
          </div>
        </div>
      )}
    </div>
  );
}
