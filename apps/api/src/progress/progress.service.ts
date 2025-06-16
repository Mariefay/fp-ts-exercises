import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { SessionService } from '../session/session.service.js';

export interface CompletedExercise {
  exerciseSlug: string;
  completedAt: Date;
}

@Injectable()
export class ProgressService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sessionService: SessionService,
  ) {}

  async getProgress(sessionId: string): Promise<CompletedExercise[]> {
    const isValidSession = await this.sessionService.validateSession(sessionId);
    if (!isValidSession) {
      return [];
    }

    const completedExercises = await this.prisma.completedExercise.findMany({
      where: { sessionId },
      orderBy: { completedAt: 'desc' },
    });

    return completedExercises.map(exercise => ({
      exerciseSlug: exercise.exerciseSlug,
      completedAt: exercise.completedAt,
    }));
  }

  async markExerciseComplete(sessionId: string, exerciseSlug: string): Promise<boolean> {
    try {
      const validSessionId = await this.sessionService.getOrCreateSession(sessionId);

      await this.prisma.completedExercise.upsert({
        where: {
          sessionId_exerciseSlug: {
            sessionId: validSessionId,
            exerciseSlug,
          },
        },
        update: {
          completedAt: new Date(),
        },
        create: {
          sessionId: validSessionId,
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
