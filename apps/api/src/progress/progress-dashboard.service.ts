import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProgressDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardData(sessionId: string) {
    if (!sessionId) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 12,

        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
    }

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        completedExercises: true,
        sessionMetrics: true
      }
    });

    if (!session) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 12,

        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
    }

    return {
      currentStreak: session.currentStreak,
      longestStreak: session.longestStreak,
      totalTimeSpent: session.totalTimeSpent,
      exercisesCompleted: session.completedExercises.length,
      totalExercises: 12,

      weeklyProgress: session.sessionMetrics.slice(-7).map(metric => ({
        ...metric,
        date: metric.date.toISOString()
      })),
      categoryProgress: await this.getCategoryProgress(sessionId),
      nextRecommendedExercise: await this.getNextRecommendedExercise(sessionId)
    };
  }

  async trackSessionTime(sessionId: string, timeSpent: number) {
    await this.prisma.session.update({
      where: { id: sessionId },
      data: {
        totalTimeSpent: {
          increment: timeSpent
        }
      }
    });
  }

  private async getCategoryProgress(sessionId: string) {
    const categories = ['option', 'either', 'array', 'string', 'pipe', 'reader'];
    const progress: Array<{
      category: string;
      completed: number;
      total: number;
      percentage: number;
    }> = [];

    for (const category of categories) {
      const completed = await this.prisma.completedExercise.count({
        where: {
          sessionId,
          exerciseSlug: {
            startsWith: category
          }
        }
      });

      const total = 2;
      progress.push({
        category,
        completed,
        total,
        percentage: Math.round((completed / total) * 100)
      });
    }

    return progress;
  }

  private async getNextRecommendedExercise(sessionId: string) {
    const completedSlugs = await this.prisma.completedExercise.findMany({
      where: { sessionId },
      select: { exerciseSlug: true }
    });

    const completed = completedSlugs.map(c => c.exerciseSlug);
    const allExercises = [
      { slug: 'option-01', title: 'None and Some', category: 'option', difficulty: 'easy' },
      { slug: 'pipe-01', title: 'Piping Hot', category: 'pipe', difficulty: 'easy' },
      { slug: 'array-01', title: 'Collection Quest', category: 'array', difficulty: 'easy' },
      { slug: 'string-01', title: 'Text Adventures', category: 'string', difficulty: 'easy' },
      { slug: 'either-01', title: 'Fork in the Road', category: 'either', difficulty: 'medium' },
      { slug: 'reader-01', title: 'Secret Map Reader', category: 'reader', difficulty: 'medium' }
    ];

    const nextExercise = allExercises.find(ex => !completed.includes(ex.slug));
    return nextExercise || null;
  }
}
