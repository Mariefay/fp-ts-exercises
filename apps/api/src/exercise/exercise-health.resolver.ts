import { Resolver, Query } from '@nestjs/graphql';
import { ExerciseValidationService } from './exercise-validation.service.js';
import { ExerciseHealthType, HealthStatus } from './exercise-health.types.js';

@Resolver()
export class ExerciseHealthResolver {
  constructor(private readonly validationService: ExerciseValidationService) {}

  @Query(() => ExerciseHealthType)
  async exerciseSystemHealth(): Promise<ExerciseHealthType> {
    const validation = await this.validationService.validateExerciseSystem();
    
    return {
      status: validation.isValid ? HealthStatus.HEALTHY : HealthStatus.WARNING,
      totalExercises: validation.totalExercises,
      totalCategories: validation.categoryValidation.length,
      issues: validation.issues,
      categoryBreakdown: validation.categoryValidation.map(cat => ({
        category: cat.category,
        exerciseCount: cat.actualCount,
        issues: cat.issues
      })),
      lastChecked: new Date().toISOString()
    };
  }
}
