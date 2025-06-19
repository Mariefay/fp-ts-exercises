import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

export interface CompletedExercise {
  exerciseSlug: string;
  completedAt: Date;
}

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getProgress(userId: string): Promise<CompletedExercise[]> {
    if (!userId) {
      return [];
    }

    const completedExercises = await this.prisma.completedExercise.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
    });

    return completedExercises.map(exercise => ({
      exerciseSlug: exercise.exerciseSlug,
      completedAt: exercise.completedAt,
    }));
  }

  async markExerciseComplete(userId: string, exerciseSlug: string): Promise<boolean> {
    try {
      if (!userId) {
        return false;
      }

      await this.prisma.completedExercise.upsert({
        where: {
          userId_exerciseSlug: {
            userId,
            exerciseSlug,
          },
        },
        update: {
          completedAt: new Date(),
        },
        create: {
          userId,
          exerciseSlug,
          completedAt: new Date(),
        },
      });

      return true;
    } catch (error) {
      console.error('Error marking exercise complete:', error);
      return false;
    }
  }
}
