import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExerciseService } from '../exercise/exercise.service.js';

@Injectable()
export class ProgressDashboardService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly exerciseService: ExerciseService
  ) {}

  async getDashboardData(sessionId: string) {
    const allExercises = await this.exerciseService.getExercises();
    const totalExercises = allExercises.length;

    if (!sessionId) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises,
        achievements: [],
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
    }

    const session = await this.prisma.session.findUnique({
      where: { id: sessionId },
      include: {
        completedExercises: true,
        achievements: true,
        sessionMetrics: true
      }
    });

    if (!session) {
      return {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises,
        achievements: [],
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
      totalExercises,
      achievements: session.achievements.map(achievement => ({
        ...achievement,
        unlockedAt: achievement.unlockedAt.toISOString()
      })),
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

      const categoryExercises = await this.exerciseService.getExercisesByCategory(category);
      const total = categoryExercises.length;
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
    const allExercises = await this.exerciseService.getExercises();

    const nextExercise = allExercises.find(ex => !completed.includes(ex.metadata.slug));
    return nextExercise ? {
      slug: nextExercise.metadata.slug,
      title: nextExercise.metadata.title,
      category: nextExercise.metadata.category,
      difficulty: nextExercise.metadata.difficulty
    } : null;
  }
}
