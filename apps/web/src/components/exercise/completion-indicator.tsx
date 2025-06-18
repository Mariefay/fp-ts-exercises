'use client';

import React from 'react';
import { useProgress } from '@/contexts/progress-context';

interface CompletionIndicatorProps {
  exerciseSlug: string;
}

export function CompletionIndicator({ exerciseSlug }: CompletionIndicatorProps) {
  const { completedExercises } = useProgress();
  
  if (!completedExercises.has(exerciseSlug)) {
    return null;
  }
  
  return (
    <span className="bg-success-100 text-success-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2">
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      Completed
    </span>
  );
}
