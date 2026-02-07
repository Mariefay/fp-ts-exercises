export interface ExerciseProgress {
  exerciseId: string
  completed: boolean
  lastAttempt: string // ISO date string
  attempts: number
  lastPassedAt?: string // ISO date string
}

export interface ModuleProgress {
  moduleName: string
  totalExercises: number
  completedExercises: number
  percentage: number
}

export interface OverallProgress {
  totalExercises: number
  completedExercises: number
  percentage: number
  modules: ModuleProgress[]
  exercises: ExerciseProgress[]
}
