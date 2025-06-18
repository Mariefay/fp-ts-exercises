import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExerciseValidationService } from '../exercise/exercise-validation.service.js';
import { ExerciseDiscoveryWrapper } from '../exercise/exercise-discovery.wrapper.js';

@Injectable()
export class ProgressDashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ExerciseValidationService,
    private readonly exerciseWrapper: ExerciseDiscoveryWrapper
  ) {}

  async getDashboardData(sessionId: string) {
    const validation = await this.validationService.validateExerciseSystem();
    
    if (!sessionId) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: validation.totalExercises,

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
        totalExercises: validation.totalExercises,

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
      totalExercises: validation.totalExercises,

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
    const categories = await this.exerciseWrapper.getCategories();
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
            startsWith: category.slug
          }
        }
      });

      progress.push({
        category: category.slug,
        completed,
        total: category.totalCount,
        percentage: Math.round((completed / category.totalCount) * 100)
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
    const allExercises = await this.exerciseWrapper.getExercises();
    
    const sortedExercises = allExercises
      .filter(ex => !completed.includes(ex.metadata.slug))
      .sort((a, b) => {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.metadata.difficulty || 'easy'] - difficultyOrder[b.metadata.difficulty || 'easy'];
      });
    
    const nextExercise = sortedExercises[0];
    if (nextExercise) {
      const result = {
        slug: nextExercise.metadata.slug,
        title: nextExercise.metadata.title,
        category: nextExercise.metadata.category,
        difficulty: nextExercise.metadata.difficulty || 'easy'
      };
      return result;
    }
    

    return null;
  }
}
