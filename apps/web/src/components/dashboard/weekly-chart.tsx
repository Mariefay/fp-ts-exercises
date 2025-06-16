'use client';

import React from 'react';

interface WeeklyChartProps {
  data: Array<{
    date: string;
    exercisesCompleted: number;
    timeSpent: number;
  }>;
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxExercises = Math.max(...data.map(d => d.exercisesCompleted), 1);
  const maxTime = Math.max(...data.map(d => d.timeSpent), 1);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Progress</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">📊</div>
          <p className="text-gray-600">Complete some exercises to see your weekly progress!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Weekly Progress</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Exercises Completed</h4>
          <div className="flex items-end justify-between h-32 gap-2">
            {data.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t flex-1 flex items-end">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 min-h-[4px]"
                    style={{ 
                      height: `${(day.exercisesCompleted / maxExercises) * 100}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  {formatDate(day.date)}
                </div>
                <div className="text-xs font-medium text-gray-900">
                  {day.exercisesCompleted}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Time Spent (minutes)</h4>
          <div className="flex items-end justify-between h-32 gap-2">
            {data.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-200 rounded-t flex-1 flex items-end">
                  <div 
                    className="w-full bg-accent-500 rounded-t transition-all duration-500 min-h-[4px]"
                    style={{ 
                      height: `${(day.timeSpent / maxTime) * 100}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-gray-600 mt-2">
                  {formatDate(day.date)}
                </div>
                <div className="text-xs font-medium text-gray-900">
                  {day.timeSpent}m
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
