import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProgressService } from './progress.service';
import { CompletedExerciseType } from './progress.types';

@Resolver()
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Query(() => [CompletedExerciseType])
  async getProgress(@Args('sessionId') sessionId: string): Promise<CompletedExerciseType[]> {
    const progress = await this.progressService.getProgress(sessionId);
    return progress.map(exercise => ({
      exerciseSlug: exercise.exerciseSlug,
      completedAt: exercise.completedAt,
    }));
  }

  @Mutation(() => Boolean)
  async markExerciseComplete(
    @Args('sessionId') sessionId: string,
    @Args('exerciseSlug') exerciseSlug: string,
  ): Promise<boolean> {
    return await this.progressService.markExerciseComplete(sessionId, exerciseSlug);
  }
}
