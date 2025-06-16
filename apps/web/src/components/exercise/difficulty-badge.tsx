'use client';

import React from 'react';

interface DifficultyBadgeProps {
  difficulty: 'easy' | 'medium' | 'hard';
  size?: 'sm' | 'md';
}

export function DifficultyBadge({ difficulty, size = 'md' }: DifficultyBadgeProps) {
  const getDifficultyConfig = (diff: string) => {
    switch (diff) {
      case 'easy':
        return {
          emoji: '🟢',
          label: 'Easy',
          className: 'bg-success-100 text-success-800 border-success-200',
        };
      case 'medium':
        return {
          emoji: '🟡',
          label: 'Medium',
          className: 'bg-warning-100 text-warning-800 border-warning-200',
        };
      case 'hard':
        return {
          emoji: '🟠',
          label: 'Hard',
          className: 'bg-accent-100 text-accent-800 border-accent-200',
        };
      default:
        return {
          emoji: '⚪',
          label: 'Unknown',
          className: 'bg-gray-100 text-gray-800 border-gray-200',
        };
    }
  };

  const config = getDifficultyConfig(difficulty);
  const sizeClasses = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium border ${config.className} ${sizeClasses}`}>
      <span>{config.emoji}</span>
      {config.label}
    </span>
  );
}
