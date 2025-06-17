'use client';

import React from 'react';
import Link from 'next/link';

interface NextExerciseCardProps {
  exercise?: {
    slug: string;
    title: string;
    category: string;
    difficulty: string;
  } | null;
}

export function NextExerciseCard({ exercise }: NextExerciseCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-success-100 text-success-800';
      case 'medium': return 'bg-warning-100 text-warning-800';
      case 'hard': return 'bg-accent-100 text-accent-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🟠';
      default: return '⚪';
    }
  };

  if (!exercise) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md card-hover border border-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">All Caught Up!</h3>
          <p className="text-sm text-gray-600">
            You&apos;ve completed all available exercises. More coming soon!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md card-hover border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Up Next</h3>
        <div className="text-2xl">🎯</div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
              {getDifficultyEmoji(exercise.difficulty)} {exercise.difficulty}
            </span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">{exercise.title}</h4>
          <p className="text-sm text-gray-600 capitalize">{exercise.category}</p>
        </div>
        
        <Link 
          href={`/exercises/${exercise.category}/${exercise.slug}`}
          className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
        >
          Start Exercise →
        </Link>
      </div>
    </div>
  );
}
