'use client';

import React from 'react';

interface Achievement {
  type: string;
  title: string;
  description: string;
  unlockedAt: string;
}

interface AchievementBadgesProps {
  achievements: Achievement[];
}

export function AchievementBadges({ achievements }: AchievementBadgesProps) {
  const getAchievementEmoji = (type: string) => {
    const emojiMap: Record<string, string> = {
      first_completion: '🎉',
      category_mastery: '🏆',
      streak_milestone: '🔥',
      speed_demon: '⚡',
      perfectionist: '💎',
      explorer: '🗺️',
      dedicated: '💪',
      scholar: '🎓',
    };
    return emojiMap[type] || '🏅';
  };

  const getAchievementColor = (type: string) => {
    const colorMap: Record<string, string> = {
      first_completion: 'from-success-400 to-success-600',
      category_mastery: 'from-warning-400 to-warning-600',
      streak_milestone: 'from-red-400 to-red-600',
      speed_demon: 'from-blue-400 to-blue-600',
      perfectionist: 'from-purple-400 to-purple-600',
      explorer: 'from-green-400 to-green-600',
      dedicated: 'from-orange-400 to-orange-600',
      scholar: 'from-indigo-400 to-indigo-600',
    };
    return colorMap[type] || 'from-gray-400 to-gray-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (achievements.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="text-center py-8">
          <div className="text-4xl mb-3">🏅</div>
          <p className="text-gray-600 mb-4">No achievements yet!</p>
          <p className="text-sm text-gray-500">
            Complete exercises to unlock your first achievement badge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Achievements</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => (
          <div 
            key={index}
            className="relative p-4 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 animate-bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${getAchievementColor(achievement.type)} opacity-10 rounded-lg`} />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-2">
                <div className="text-2xl">
                  {getAchievementEmoji(achievement.type)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">
                    {achievement.title}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {formatDate(achievement.unlockedAt)}
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
