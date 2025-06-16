import { Injectable } from '@nestjs/common';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper.js';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseWrapper: ExerciseDiscoveryWrapper) {}

  async getExercises(): Promise<any[]> {
    return await this.exerciseWrapper.getExercises();
  }

  async getExerciseBySlug(slug: string): Promise<any | null> {
    return await this.exerciseWrapper.getExerciseBySlug(slug);
  }

  async getExercisesByCategory(category: string): Promise<any[]> {
    return await this.exerciseWrapper.getExercisesByCategory(category);
  }

  async getCategories(): Promise<any[]> {
    return await this.exerciseWrapper.getCategories();
  }
}
