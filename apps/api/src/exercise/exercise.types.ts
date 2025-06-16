import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

registerEnumType(DifficultyLevel, {
  name: 'DifficultyLevel',
});

@ObjectType()
export class ExerciseType {
  @Field()
  slug: string;

  @Field()
  category: string;

  @Field()
  number: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => DifficultyLevel)
  difficulty: DifficultyLevel;

  @Field(() => [String])
  tags: string[];

  @Field()
  starterCode: string;

  @Field()
  solutionCode: string;

  @Field(() => [String])
  imports: string[];
}

@ObjectType()
export class ExerciseCategoryType {
  @Field()
  name: string;

  @Field()
  slug: string;

  @Field()
  description: string;

  @Field()
  totalCount: number;
}
