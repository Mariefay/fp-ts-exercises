import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CompletedExerciseType {
  @Field()
  exerciseSlug: string;

  @Field()
  completedAt: Date;
}
