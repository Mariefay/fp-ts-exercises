import { Injectable, Logger } from '@nestjs/common';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper.js';

export interface ValidationResult {
  isValid: boolean;
  totalExercises: number;
  categoryValidation: Array<{
    category: string;
    actualCount: number;
    issues: string[];
  }>;
  issues: string[];
}

@Injectable()
export class ExerciseValidationService {
  private readonly logger = new Logger(ExerciseValidationService.name);
  private cachedValidation: ValidationResult | null = null;

  constructor(private readonly exerciseWrapper: ExerciseDiscoveryWrapper) {}

  async validateExerciseSystem(): Promise<ValidationResult> {
    if (this.cachedValidation) {
      return this.cachedValidation;
    }

    try {
      const [exercises, categories] = await Promise.all([
        this.exerciseWrapper.getExercises(),
        this.exerciseWrapper.getCategories()
      ]);

      const issues: string[] = [];
      const categoryValidation = [];

      for (const category of categories) {
        const categoryIssues: string[] = [];
        const categoryExercises = exercises.filter(ex => ex.metadata.category === category.slug);
        
        if (categoryExercises.length !== category.totalCount) {
          categoryIssues.push(`Expected ${category.totalCount} exercises, found ${categoryExercises.length}`);
        }

        const exerciseNumbers = new Set();
        for (const exercise of categoryExercises) {
          if (exerciseNumbers.has(exercise.metadata.number)) {
            categoryIssues.push(`Duplicate exercise number: ${exercise.metadata.number}`);
          }
          exerciseNumbers.add(exercise.metadata.number);
        }

        categoryValidation.push({
          category: category.slug,
          actualCount: categoryExercises.length,
          issues: categoryIssues
        });

        if (categoryIssues.length > 0) {
          issues.push(`Category ${category.slug}: ${categoryIssues.join(', ')}`);
        }
      }

      const totalExercises = exercises.length;
      if (totalExercises === 0) {
        issues.push('No exercises found in discovery system');
      }

      const result: ValidationResult = {
        isValid: issues.length === 0,
        totalExercises,
        categoryValidation,
        issues
      };

      if (result.isValid) {
        this.logger.log(`Exercise validation passed: ${totalExercises} exercises across ${categories.length} categories`);
      } else {
        this.logger.warn(`Exercise validation issues found: ${issues.join('; ')}`);
      }

      this.cachedValidation = result;
      return result;
    } catch (error) {
      this.logger.error('Failed to validate exercise system:', error);
      return {
        isValid: false,
        totalExercises: 0,
        categoryValidation: [],
        issues: [`Validation failed: ${error.message}`]
      };
    }
  }

  clearCache(): void {
    this.cachedValidation = null;
  }
}
