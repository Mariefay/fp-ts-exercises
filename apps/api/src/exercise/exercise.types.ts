import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';

export enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

registerEnumType(DifficultyLevel, {
  name: 'DifficultyLevel',
});

@ObjectType()
export class TestCaseType {
  @Field()
  description: string;

  @Field()
  code: string;

  @Field()
  type: string;
}

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

  @Field(() => [TestCaseType])
  testCases: TestCaseType[];

  @Field({ nullable: true })
  conceptTitle?: string;

  @Field({ nullable: true })
  goalStatement?: string;

  @Field({ nullable: true })
  conceptExplanation?: string;

  @Field(() => [String], { nullable: true })
  hints?: string[];

  @Field(() => [String], { nullable: true })
  successCriteria?: string[];

  @Field({ nullable: true })
  estimatedTime?: number;

  @Field({ nullable: true })
  theme?: string;
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
