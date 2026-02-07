import { ModuleProgress, ExerciseProgress } from '@/types/progress'

/**
 * Calculates percentage rounded to nearest whole number
 * @param completed - Number of completed items
 * @param total - Total number of items
 * @returns Percentage (0-100), or 0 if total is 0
 */
export function calculatePercentage(completed: number, total: number): number {
  return total > 0 ? Math.round((completed / total) * 100) : 0
}

/**
 * Extracts module name from exercise ID
 * Exercise IDs follow format: "{module}-{number}"
 * @param exerciseId - Exercise ID (e.g., "array-01", "option-05")
 * @returns Module name in lowercase (e.g., "array", "option")
 */
export function getModuleFromExerciseId(exerciseId: string): string {
  // Match everything before the last "-{number}" pattern
  const match = exerciseId.match(/^(.+?)-\d+$/)
  return match ? match[1] : exerciseId
}

/**
 * Filters exercises by module name
 * Uses the category field when available, falls back to ID parsing for backward compatibility
 * @param exercises - Array of exercise progress entries
 * @param moduleName - Module name to filter by (PascalCase like "Array", "Either")
 * @returns Filtered exercises belonging to the module
 */
export function getExercisesByModule(
  exercises: ExerciseProgress[],
  moduleName: string
): ExerciseProgress[] {
  const moduleKey = moduleName.toLowerCase()
  return exercises.filter(ex => {
    // Prefer category if available (new format)
    if (ex.category) {
      return ex.category === moduleName
    }
    // Fallback to ID parsing (backward compatibility with old localStorage)
    return getModuleFromExerciseId(ex.exerciseId) === moduleKey
  })
}

/**
 * Recalculates progress for all modules based on current exercise states
 * @param modules - Current module progress array
 * @param exercises - Current exercise progress array
 * @returns Updated module progress array with recalculated stats
 */
export function recalculateModuleProgress(
  modules: ModuleProgress[],
  exercises: ExerciseProgress[]
): ModuleProgress[] {
  return modules.map(module => {
    const moduleExercises = getExercisesByModule(exercises, module.moduleName)
    const moduleCompleted = moduleExercises.filter(ex => ex.completed).length

    return {
      ...module,
      completedExercises: moduleCompleted,
      percentage: calculatePercentage(moduleCompleted, module.totalExercises)
    }
  })
}
