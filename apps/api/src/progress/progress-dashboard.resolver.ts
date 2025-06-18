import { Resolver, Query, Mutation, Args, ObjectType, Field, Int } from '@nestjs/graphql';
import { ProgressDashboardService } from './progress-dashboard.service.js';



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
  async getProgressDashboard(@Args('sessionId') sessionId: string): Promise<ProgressDashboard> {
    return await this.progressDashboardService.getDashboardData(sessionId);
  }

  @Mutation(() => Boolean)
  async trackSessionTime(
    @Args('sessionId') sessionId: string,
    @Args('timeSpent', { type: () => Int }) timeSpent: number
  ): Promise<boolean> {
    await this.progressDashboardService.trackSessionTime(sessionId, timeSpent);
    return true;
  }
}
