'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { ExerciseProgress, OverallProgress, ModuleProgress } from '@/types/progress'
import { Exercise } from '@/types/exercise'

interface ProgressContextType {
  progress: OverallProgress
  markExerciseComplete: (exerciseId: string) => void
  markExerciseIncomplete: (exerciseId: string) => void
  recordAttempt: (exerciseId: string) => void
  isExerciseComplete: (exerciseId: string) => boolean
  getExerciseProgress: (exerciseId: string) => ExerciseProgress | undefined
  resetProgress: () => void
  calculateProgress: (exercises: Exercise[]) => void
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

const STORAGE_KEY = 'fp-ts-exercises-progress'

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<OverallProgress>({
    totalExercises: 0,
    completedExercises: 0,
    percentage: 0,
    modules: [],
    exercises: []
  })

  // Load progress from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as OverallProgress
        setProgress(parsed)
      } catch (error) {
        console.error('Failed to load progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (progress.totalExercises > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress])

  const calculateProgress = useCallback((exercises: Exercise[]) => {
    setProgress(prev => {
      const existingProgress = prev.exercises

      // Create exercise progress entries for all exercises
      const exerciseProgress: ExerciseProgress[] = exercises.map(ex => {
        const existing = existingProgress.find(p => p.exerciseId === ex.id)
        return existing || {
          exerciseId: ex.id,
          completed: false,
          lastAttempt: new Date().toISOString(),
          attempts: 0
        }
      })

      // Calculate module progress
      const moduleMap = new Map<string, { total: number; completed: number }>()

      exercises.forEach(ex => {
        const current = moduleMap.get(ex.category) || { total: 0, completed: 0 }
        current.total++

        const exProgress = exerciseProgress.find(p => p.exerciseId === ex.id)
        if (exProgress?.completed) {
          current.completed++
        }

        moduleMap.set(ex.category, current)
      })

      const modules: ModuleProgress[] = Array.from(moduleMap.entries()).map(([name, stats]) => ({
        moduleName: name,
        totalExercises: stats.total,
        completedExercises: stats.completed,
        percentage: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0
      }))

      const completedCount = exerciseProgress.filter(p => p.completed).length
      const totalCount = exercises.length

      return {
        totalExercises: totalCount,
        completedExercises: completedCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        modules,
        exercises: exerciseProgress
      }
    })
  }, [])

  const markExerciseComplete = useCallback((exerciseId: string) => {
    setProgress(prev => {
      const exercises = prev.exercises.map(ex =>
        ex.exerciseId === exerciseId
          ? {
              ...ex,
              completed: true,
              lastPassedAt: new Date().toISOString(),
              lastAttempt: new Date().toISOString()
            }
          : ex
      )

      // If exercise doesn't exist, create it
      if (!exercises.find(ex => ex.exerciseId === exerciseId)) {
        exercises.push({
          exerciseId,
          completed: true,
          lastAttempt: new Date().toISOString(),
          lastPassedAt: new Date().toISOString(),
          attempts: 1
        })
      }

      const completedCount = exercises.filter(e => e.completed).length
      const totalCount = prev.totalExercises

      // Recalculate module progress
      const updatedModules = prev.modules.map(module => {
        const moduleExercises = exercises.filter(ex =>
          ex.exerciseId.startsWith(module.moduleName.toLowerCase())
        )
        const moduleCompleted = moduleExercises.filter(ex => ex.completed).length

        return {
          ...module,
          completedExercises: moduleCompleted,
          percentage: module.totalExercises > 0
            ? Math.round((moduleCompleted / module.totalExercises) * 100)
            : 0
        }
      })

      return {
        ...prev,
        exercises,
        completedExercises: completedCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        modules: updatedModules
      }
    })
  }, [])

  const markExerciseIncomplete = useCallback((exerciseId: string) => {
    setProgress(prev => {
      const exercises = prev.exercises.map(ex =>
        ex.exerciseId === exerciseId
          ? { ...ex, completed: false, lastPassedAt: undefined }
          : ex
      )

      const completedCount = exercises.filter(e => e.completed).length
      const totalCount = prev.totalExercises

      // Recalculate module progress
      const updatedModules = prev.modules.map(module => {
        const moduleExercises = exercises.filter(ex =>
          ex.exerciseId.startsWith(module.moduleName.toLowerCase())
        )
        const moduleCompleted = moduleExercises.filter(ex => ex.completed).length

        return {
          ...module,
          completedExercises: moduleCompleted,
          percentage: module.totalExercises > 0
            ? Math.round((moduleCompleted / module.totalExercises) * 100)
            : 0
        }
      })

      return {
        ...prev,
        exercises,
        completedExercises: completedCount,
        percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0,
        modules: updatedModules
      }
    })
  }, [])

  const recordAttempt = useCallback((exerciseId: string) => {
    setProgress(prev => {
      const exercises = prev.exercises.map(ex =>
        ex.exerciseId === exerciseId
          ? {
              ...ex,
              attempts: ex.attempts + 1,
              lastAttempt: new Date().toISOString()
            }
          : ex
      )

      // If exercise doesn't exist, create it
      if (!exercises.find(ex => ex.exerciseId === exerciseId)) {
        exercises.push({
          exerciseId,
          completed: false,
          lastAttempt: new Date().toISOString(),
          attempts: 1
        })
      }

      return { ...prev, exercises }
    })
  }, [])

  const isExerciseComplete = useCallback((exerciseId: string) => {
    return progress.exercises.find(ex => ex.exerciseId === exerciseId)?.completed || false
  }, [progress.exercises])

  const getExerciseProgress = useCallback((exerciseId: string) => {
    return progress.exercises.find(ex => ex.exerciseId === exerciseId)
  }, [progress.exercises])

  const resetProgress = useCallback(() => {
    setProgress({
      totalExercises: 0,
      completedExercises: 0,
      percentage: 0,
      modules: [],
      exercises: []
    })
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markExerciseComplete,
        markExerciseIncomplete,
        recordAttempt,
        isExerciseComplete,
        getExerciseProgress,
        resetProgress,
        calculateProgress
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
