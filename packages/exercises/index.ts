export * from './lib/types.js';
export * from './lib/parser.js';
export * from './lib/discovery.js';

import { ExerciseDiscovery } from './lib/discovery.js';
export { ExerciseDiscovery } from './lib/discovery.js';
export type { 
  Exercise, 
  ExerciseMetadata, 
  ExerciseCategory, 
  ExerciseCatalog,
  TestCase 
} from './lib/types.js';

const discovery = new ExerciseDiscovery();

export const getExercises = () => discovery.getExercises();
export const getExerciseBySlug = (slug: string) => discovery.getExerciseBySlug(slug);
export const getExercisesByCategory = (category: string) => discovery.getExercisesByCategory(category);
export const getCategories = () => discovery.getCategories();
export const getCategoryBySlug = (slug: string) => discovery.getCategoryBySlug(slug);
