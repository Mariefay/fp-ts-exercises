'use client';

import React from 'react';
import Link from 'next/link';

interface CategoryProgressProps {
  categories: Array<{
    category: string;
    completed: number;
    total: number;
    percentage: number;
  }>;
}

export function CategoryProgress({ categories }: CategoryProgressProps) {
  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      option: '🎯',
      either: '🔀',
      array: '📚',
      string: '📝',
      pipe: '🔗',
      reader: '🗝️',
      io: '⚡',
      validation: '✅',
      task: '🚀',
      taskeither: '🛡️',
      readertaskeither: '🏰',
      optics: '🔍',
    };
    return emojiMap[category.toLowerCase()] || '📖';
  };

  const getCategoryTitle = (category: string) => {
    const titleMap: Record<string, string> = {
      option: 'Option Types',
      either: 'Either Types',
      array: 'Array Operations',
      string: 'String Manipulation',
      pipe: 'Function Composition',
      reader: 'Dependency Injection',
      io: 'Side Effects',
      validation: 'Input Validation',
      task: 'Async Operations',
      taskeither: 'Async Error Handling',
      readertaskeither: 'Advanced Patterns',
      optics: 'Data Manipulation',
    };
    return titleMap[category.toLowerCase()] || category;
  };

  if (categories.length === 0) {
    return (
      <div className="bg-white rounded-lg p-8 shadow-md border border-gray-100 text-center">
        <div className="text-4xl mb-3">📚</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Progress Yet</h3>
        <p className="text-gray-600">Start your first exercise to see your progress here!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Category Progress</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Link
            key={category.category}
            href={`/exercises/${category.category}`}
            className="block p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 card-hover"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{getCategoryEmoji(category.category)}</span>
                <h4 className="font-medium text-gray-900">{getCategoryTitle(category.category)}</h4>
              </div>
              <span className="text-sm font-medium text-primary-600">
                {category.percentage}%
              </span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div 
                className="bg-primary-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              {category.completed} of {category.total} completed
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
