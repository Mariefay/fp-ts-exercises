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

  async getDashboardData(userId: string) {
    const validation = await this.validationService.validateExerciseSystem();
    
    if (!userId) {
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

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        completedExercises: true,
        sessionMetrics: true
      }
    });

    if (!user) {
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
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalTimeSpent: user.totalTimeSpent,
      exercisesCompleted: user.completedExercises.length,
      totalExercises: validation.totalExercises,

      weeklyProgress: user.sessionMetrics.slice(-7).map(metric => ({
        ...metric,
        date: metric.date.toISOString()
      })),
      categoryProgress: await this.getCategoryProgress(userId),
      nextRecommendedExercise: await this.getNextRecommendedExercise(userId)
    };
  }

  async trackSessionTime(userId: string, timeSpent: number) {
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalTimeSpent: {
          increment: timeSpent
        }
      }
    });
  }

  private async getCategoryProgress(userId: string) {
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
          userId,
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

  private async getNextRecommendedExercise(userId: string) {
    const completedSlugs = await this.prisma.completedExercise.findMany({
      where: { userId },
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
