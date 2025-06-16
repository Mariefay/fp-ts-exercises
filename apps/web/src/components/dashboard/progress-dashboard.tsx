'use client';

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROGRESS_DASHBOARD } from '@/lib/graphql/queries';
import { useProgress } from '@/contexts/progress-context';
import { ProgressRing } from './progress-ring';
import { StreakCounter } from './streak-counter';
import { WeeklyChart } from './weekly-chart';
import { AchievementBadges } from './achievement-badges';
import { CategoryProgress } from './category-progress';
import { TimeSpentCard } from './time-spent-card';
import { NextExerciseCard } from './next-exercise-card';
import { DashboardSkeleton } from './dashboard-skeleton';

export function ProgressDashboard() {
  const { sessionId } = useProgress();
  const { data, loading, error } = useQuery(GET_PROGRESS_DASHBOARD, {
    variables: { sessionId },
    skip: !sessionId,
    pollInterval: 30000,
  });

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🔧</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Dashboard Unavailable</h2>
          <p className="text-gray-600">We're working on getting your progress data ready.</p>
        </div>
      </div>
    );
  }

  const dashboard = data?.getProgressDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Your Learning Journey</h1>
          <p className="text-xl text-gray-600">Master functional programming with fp-ts</p>
        </div>

        <div className="flex justify-center animate-slide-up">
          <ProgressRing 
            completed={dashboard?.exercisesCompleted || 0}
            total={dashboard?.totalExercises || 1}
            size="large"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up">
          <StreakCounter 
            current={dashboard?.currentStreak || 0}
            longest={dashboard?.longestStreak || 0}
          />
          <TimeSpentCard timeSpent={dashboard?.totalTimeSpent || 0} />
          <NextExerciseCard exercise={dashboard?.nextRecommendedExercise} />
        </div>

        <CategoryProgress categories={dashboard?.categoryProgress || []} />

        <WeeklyChart data={dashboard?.weeklyProgress || []} />

        <AchievementBadges achievements={dashboard?.achievements || []} />
      </div>
    </div>
  );
}
