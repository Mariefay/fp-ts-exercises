import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum HealthStatus {
  HEALTHY = 'healthy',
  WARNING = 'warning',
  ERROR = 'error'
}

registerEnumType(HealthStatus, {
  name: 'HealthStatus',
});

@ObjectType()
export class CategoryHealthType {
  @Field()
  category: string;

  @Field()
  exerciseCount: number;

  @Field(() => [String])
  issues: string[];
}

@ObjectType()
export class ExerciseHealthType {
  @Field(() => HealthStatus)
  status: HealthStatus;

  @Field()
  totalExercises: number;

  @Field()
  totalCategories: number;

  @Field(() => [String])
  issues: string[];

  @Field(() => [CategoryHealthType])
  categoryBreakdown: CategoryHealthType[];

  @Field()
  lastChecked: string;
}
