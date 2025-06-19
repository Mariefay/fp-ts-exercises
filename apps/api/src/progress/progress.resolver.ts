import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProgressService } from './progress.service.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';

@Resolver()
export class ProgressResolver {
  constructor(private readonly progressService: ProgressService) {}

  @Query(() => [String])
  @UseGuards(JwtAuthGuard)
  async getProgress(@Context() context: { req: { user: { id: string } } }) {
    const userId = context.req.user.id;
    const progress = await this.progressService.getProgress(userId);
    return progress.map(p => JSON.stringify(p));
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async markExerciseComplete(
    @Args('exerciseSlug') exerciseSlug: string,
    @Context() context: { req: { user: { id: string } } },
  ): Promise<boolean> {
    const userId = context.req.user.id;
    return await this.progressService.markExerciseComplete(userId, exerciseSlug);
  }
}
