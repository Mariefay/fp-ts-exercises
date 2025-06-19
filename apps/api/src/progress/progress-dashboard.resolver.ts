import { Resolver, Query, Mutation, Args, ObjectType, Field, Int, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProgressDashboardService } from './progress-dashboard.service.js';
import { JwtAuthGuard } from '../auth/auth.guard.js';



@ObjectType()
export class WeeklyProgress {
  @Field()
  date: string;

  @Field(() => Int)
  exercisesCompleted: number;

  @Field(() => Int)
  timeSpent: number;
}

@ObjectType()
export class CategoryProgress {
  @Field()
  category: string;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  percentage: number;
}

@ObjectType()
export class NextRecommendedExercise {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field()
  difficulty: string;
}

@ObjectType()
export class ProgressDashboard {
  @Field(() => Int)
  currentStreak: number;

  @Field(() => Int)
  longestStreak: number;

  @Field(() => Int)
  totalTimeSpent: number;

  @Field(() => Int)
  exercisesCompleted: number;

  @Field(() => Int)
  totalExercises: number;



  @Field(() => [WeeklyProgress])
  weeklyProgress: WeeklyProgress[];

  @Field(() => [CategoryProgress])
  categoryProgress: CategoryProgress[];

  @Field(() => NextRecommendedExercise, { nullable: true })
  nextRecommendedExercise?: NextRecommendedExercise;
}

@Resolver()
export class ProgressDashboardResolver {
  constructor(private readonly progressDashboardService: ProgressDashboardService) {}

  @Query(() => ProgressDashboard)
  @UseGuards(JwtAuthGuard)
  async getProgressDashboard(@Context() context: { req: { user: { id: string } } }): Promise<ProgressDashboard> {
    const userId = context.req.user.id;
    return await this.progressDashboardService.getDashboardData(userId);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async trackSessionTime(
    @Args('timeSpent', { type: () => Int }) timeSpent: number,
    @Context() context: { req: { user: { id: string } } },
  ): Promise<boolean> {
    const userId = context.req.user.id;
    await this.progressDashboardService.trackSessionTime(userId, timeSpent);
    return true;
  }
}
