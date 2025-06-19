import { Resolver, Query, Args } from '@nestjs/graphql';
import { ExerciseService } from './exercise.service.js';
import { ExerciseType, ExerciseCategoryType } from './exercise.types.js';

@Resolver()
export class ExerciseResolver {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Query(() => [ExerciseType])
  async getExercises(): Promise<ExerciseType[]> {
    const exercises = await this.exerciseService.getExercises();
    return exercises.map(this.mapExerciseToGraphQL);
  }

  @Query(() => ExerciseType, { nullable: true })
  async getExerciseBySlug(@Args('slug') slug: string): Promise<ExerciseType | null> {
    const exercise = await this.exerciseService.getExerciseBySlug(slug);
    return exercise ? this.mapExerciseToGraphQL(exercise) : null;
  }

  @Query(() => [ExerciseType])
  async getExercisesByCategory(@Args('category') category: string): Promise<ExerciseType[]> {
    const exercises = await this.exerciseService.getExercisesByCategory(category);
    return exercises.map(this.mapExerciseToGraphQL);
  }

  @Query(() => [ExerciseCategoryType])
  async getCategories(): Promise<ExerciseCategoryType[]> {
    const categories = await this.exerciseService.getCategories();
    return categories.map(this.mapCategoryToGraphQL);
  }

  private mapExerciseToGraphQL(exercise: any): ExerciseType {
    return {
      slug: exercise.metadata.slug,
      category: exercise.metadata.category,
      number: exercise.metadata.number,
      title: exercise.metadata.title,
      description: exercise.metadata.description,
      difficulty: exercise.metadata.difficulty || 'easy',
      tags: exercise.metadata.tags,
      starterCode: exercise.starterCode,
      solutionCode: exercise.solutionCode,
      imports: exercise.imports,
      testCases: exercise.testCases || [],
      conceptTitle: exercise.metadata.conceptTitle,
      goalStatement: exercise.metadata.goalStatement,
      conceptExplanation: exercise.metadata.conceptExplanation,
      hints: exercise.metadata.hints,
      successCriteria: exercise.metadata.successCriteria,
      estimatedTime: exercise.metadata.estimatedTime,
      theme: exercise.metadata.theme,
    };
  }

  private mapCategoryToGraphQL(category: any): ExerciseCategoryType {
    return {
      name: category.name,
      slug: category.slug,
      description: category.description,
      totalCount: category.totalCount,
    };
  }
}
