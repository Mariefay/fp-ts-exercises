import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Exercise, ExerciseCategory, ExerciseCatalog, ExerciseMetadata } from './types.js';
import { ExerciseParser } from './parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ExerciseDiscovery {
  private srcPath: string;
  private parser: ExerciseParser;
  private catalog: ExerciseCatalog | null = null;

  constructor() {
    this.srcPath = path.resolve(__dirname, '../../src');
    this.parser = new ExerciseParser(this.srcPath);
  }

  /**
   * Scan the file system and build the exercise catalog
   */
  async buildCatalog(): Promise<ExerciseCatalog> {
    if (this.catalog) {
      return this.catalog;
    }

    const categories: ExerciseCategory[] = [];
    const exercises: Exercise[] = [];

    const categoryDirs = fs.readdirSync(this.srcPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    for (const categoryName of categoryDirs) {
      const categoryPath = path.join(this.srcPath, categoryName);
      const categoryExercises = await this.scanCategoryExercises(categoryName, categoryPath);
      
      exercises.push(...categoryExercises);
      
      categories.push({
        name: this.formatCategoryName(categoryName),
        slug: categoryName,
        description: this.getCategoryDescription(categoryName),
        exercises: categoryExercises.map(ex => ex.metadata),
        totalCount: categoryExercises.length,
      });
    }

    this.catalog = {
      categories,
      exercises,
      totalCount: exercises.length,
    };

    return this.catalog;
  }

  /**
   * Scan exercises in a specific category directory
   */
  private async scanCategoryExercises(categoryName: string, categoryPath: string): Promise<Exercise[]> {
    const exercises: Exercise[] = [];
    
    const allFiles = fs.readdirSync(categoryPath);
    
    const exerciseGroups = new Map<string, { exercise?: string; solution?: string }>();
    
    for (const file of allFiles) {
      const numberMatch = file.match(/^(\d+)/);
      if (!numberMatch) continue;
      
      const number = numberMatch[1];
      if (!exerciseGroups.has(number)) {
        exerciseGroups.set(number, {});
      }
      
      const group = exerciseGroups.get(number)!;
      if (file.includes('.exercise.')) {
        group.exercise = file;
      } else if (file.includes('.solution.')) {
        group.solution = file;
      }
    }

    for (const [number, group] of Array.from(exerciseGroups.entries())) {
      if (group.exercise && group.solution) {
        const exerciseFile = path.join(categoryPath, group.exercise);
        const solutionFile = path.join(categoryPath, group.solution);
        
        try {
          const exercise = this.parser.parseExercise(categoryName, exerciseFile, solutionFile);
          const enhancedExercise = {
            ...exercise,
            slug: exercise.metadata.slug,
            title: exercise.metadata.title,
            description: exercise.metadata.description,
            difficulty: exercise.metadata.difficulty,
            tags: exercise.metadata.tags,
            conceptTitle: exercise.metadata.conceptTitle,
            goalStatement: exercise.metadata.goalStatement,
            conceptExplanation: exercise.metadata.conceptExplanation,
            hints: exercise.metadata.hints,
            successCriteria: exercise.metadata.successCriteria,
            estimatedTime: exercise.metadata.estimatedTime,
          };
          exercises.push(enhancedExercise);
        } catch (error) {
          console.warn(`Failed to parse exercise ${categoryName}/${number}:`, {
            error: error instanceof Error ? error.message : String(error),
            exerciseFile: group.exercise,
            solutionFile: group.solution
          });
        }
      }
    }

    exercises.sort((a, b) => parseInt(a.metadata.number) - parseInt(b.metadata.number));
    
    return exercises;
  }

  /**
   * Get all exercises
   */
  async getExercises(): Promise<Exercise[]> {
    const catalog = await this.buildCatalog();
    return catalog.exercises;
  }

  /**
   * Get exercise by slug (e.g., "option-01")
   */
  async getExerciseBySlug(slug: string): Promise<Exercise | null> {
    const catalog = await this.buildCatalog();
    return catalog.exercises.find(ex => ex.metadata.slug === slug) || null;
  }

  /**
   * Get exercises by category
   */
  async getExercisesByCategory(category: string): Promise<Exercise[]> {
    const catalog = await this.buildCatalog();
    return catalog.exercises.filter(ex => ex.metadata.category === category);
  }

  /**
   * Get all categories
   */
  async getCategories(): Promise<ExerciseCategory[]> {
    const catalog = await this.buildCatalog();
    return catalog.categories;
  }

  /**
   * Get category by slug
   */
  async getCategoryBySlug(slug: string): Promise<ExerciseCategory | null> {
    const catalog = await this.buildCatalog();
    return catalog.categories.find(cat => cat.slug === slug) || null;
  }

  private formatCategoryName(categoryName: string): string {
    return categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
  }

  private getCategoryDescription(categoryName: string): string {
    const descriptions: Record<string, string> = {
      option: 'Learn to handle optional values safely with the Option type',
      either: 'Master error handling with the Either type',
      task: 'Work with asynchronous operations using Task',
      taskEither: 'Combine async operations with error handling',
      readerTaskEither: 'Advanced dependency injection patterns',
      pipe: 'Function composition with pipe',
      flow: 'Function composition with flow',
    };
    
    return descriptions[categoryName] || `Exercises for ${categoryName}`;
  }
}
