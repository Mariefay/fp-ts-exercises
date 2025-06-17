'use client';

import React from 'react';

interface TimeSpentCardProps {
  timeSpent: number;
}

export function TimeSpentCard({ timeSpent }: TimeSpentCardProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getTimeEmoji = (minutes: number) => {
    if (minutes < 30) return '⏰';
    if (minutes < 120) return '📚';
    if (minutes < 300) return '🎯';
    return '🏅';
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md card-hover border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Time Invested</h3>
        <div className="text-2xl">
          {getTimeEmoji(timeSpent)}
        </div>
      </div>
      
      <div className="text-center">
        <div className="text-3xl font-bold text-accent-600 mb-1">
          {formatTime(timeSpent)}
        </div>
        <div className="text-sm text-gray-600 mb-4">
          total learning time
        </div>
        
        <div className="bg-accent-50 rounded-lg p-3">
          <p className="text-sm text-accent-700">
            {timeSpent < 30 
              ? "Great start! Every minute counts 🌟"
              : timeSpent < 120
              ? "You're building momentum! 🚀"
              : timeSpent < 300
              ? "Impressive dedication! 🎯"
              : "You're a learning champion! 🏆"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
