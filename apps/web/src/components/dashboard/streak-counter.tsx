'use client';

import React from 'react';

interface StreakCounterProps {
  current: number;
  longest: number;
}

export function StreakCounter({ current, longest }: StreakCounterProps) {
  const getStreakEmoji = (streak: number) => {
    if (streak === 0) return '🌱';
    if (streak < 3) return '🔥';
    if (streak < 7) return '🚀';
    if (streak < 14) return '⭐';
    return '🏆';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md card-hover border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Learning Streak</h3>
        <div className="text-2xl animate-bounce-in">
          {getStreakEmoji(current)}
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-primary-600 mb-1">
            {current}
          </div>
          <div className="text-sm text-gray-600">
            {current === 1 ? 'day' : 'days'} current
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Best streak:</span>
            <span className="font-semibold text-gray-900">
              {longest} {longest === 1 ? 'day' : 'days'}
            </span>
          </div>
        </div>
        
        {current === 0 && (
          <div className="bg-primary-50 rounded-lg p-3 text-center">
            <p className="text-sm text-primary-700">
              Complete an exercise today to start your streak! 🌟
            </p>
          </div>
        )}
        
        {current > 0 && (
          <div className="bg-success-50 rounded-lg p-3 text-center">
            <p className="text-sm text-success-700">
              Keep it up! Come back tomorrow to continue your streak! 💪
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
