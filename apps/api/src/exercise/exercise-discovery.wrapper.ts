import { Injectable } from '@nestjs/common';

@Injectable()
export class ExerciseDiscoveryWrapper {
  private exerciseModule: any;

  async getExerciseModule() {
    if (!this.exerciseModule) {
      this.exerciseModule = await import('@fp-ts-exercises/exercises');
    }
    return this.exerciseModule;
  }

  async getExercises() {
    const module = await this.getExerciseModule();
    return await module.getExercises();
  }

  async getExerciseBySlug(slug: string) {
    const module = await this.getExerciseModule();
    return await module.getExerciseBySlug(slug);
  }

  async getExercisesByCategory(category: string) {
    const module = await this.getExerciseModule();
    return await module.getExercisesByCategory(category);
  }

  async getCategories() {
    const module = await this.getExerciseModule();
    return await module.getCategories();
  }
}
