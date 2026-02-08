'use client'

import { useProgress } from '@/contexts/ProgressContext'
import { generatedExercises } from '@/data/generated-exercises'
import { getExercisesByModule } from '@/utils/progress-helpers'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Dashboard() {
  const { progress, calculateProgress } = useProgress()
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set())

  // Initialize progress with all exercises on mount
  useEffect(() => {
    if (progress.totalExercises === 0) {
      calculateProgress(generatedExercises)
    }
  }, [progress.totalExercises, calculateProgress])

  if (progress.totalExercises === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-8 sm:py-12">
            <div className="text-4xl sm:text-6xl mb-4">📚</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Loading Dashboard...
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Initializing {generatedExercises.length} exercises across {new Set(generatedExercises.map(e => e.category)).size} modules
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
            Your Progress Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Track your functional programming journey with fp-ts
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-lg p-4 sm:p-8 mb-4 sm:mb-6 border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 sm:mb-4 gap-2">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Overall Progress
            </h2>
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">
              {progress.percentage}%
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-4 sm:h-6 mb-3 sm:mb-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500 flex items-center justify-center text-white text-xs sm:text-sm font-medium"
              style={{ width: `${progress.percentage}%` }}
            >
              {progress.percentage > 15 && `${progress.percentage}%`}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-700 gap-1 sm:gap-0">
            <span className="text-sm sm:text-base">
              {progress.completedExercises} of {progress.totalExercises} exercises completed
            </span>
            <span className="text-xs sm:text-sm">
              {progress.totalExercises - progress.completedExercises} remaining
            </span>
          </div>
        </div>

        {/* Module Progress - Collapsible */}
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
              Module Progress ({progress.modules.length})
            </h2>
            <button
              onClick={() => {
                if (expandedModules.size === progress.modules.length) {
                  setExpandedModules(new Set())
                } else {
                  setExpandedModules(new Set(progress.modules.map(m => m.moduleName)))
                }
              }}
              className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              {expandedModules.size === progress.modules.length ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {progress.modules
            .sort((a, b) => a.moduleName.localeCompare(b.moduleName))
            .map((module) => {
              const moduleExercises = getExercisesByModule(progress.exercises, module.moduleName)
              const isExpanded = expandedModules.has(module.moduleName)

              return (
                <div
                  key={module.moduleName}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                >
                  {/* Module Header - Always Visible */}
                  <button
                    onClick={() => {
                      const newExpanded = new Set(expandedModules)
                      if (isExpanded) {
                        newExpanded.delete(module.moduleName)
                      } else {
                        newExpanded.add(module.moduleName)
                      }
                      setExpandedModules(newExpanded)
                    }}
                    className="w-full px-3 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 hover:bg-gray-50 transition-colors text-left"
                    aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${module.moduleName} exercises`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-2 sm:gap-4">
                      <svg
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-500 transition-transform flex-shrink-0 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 capitalize">
                        {module.moduleName}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 ml-6 sm:ml-0">
                      <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                        {module.completedExercises}/{module.totalExercises}
                      </span>
                      <div className="w-20 sm:w-32 bg-gray-200 rounded-full h-1.5 sm:h-2 flex-shrink-0">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${module.percentage}%` }}
                        />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-blue-600 w-10 sm:w-12 text-right">
                        {module.percentage}%
                      </span>
                    </div>
                  </button>

                  {/* Exercise List - Collapsible */}
                  {isExpanded && (
                    <div className="border-t border-gray-200 p-3 sm:p-4 bg-gray-50">
                      <div className="space-y-2">
                        {moduleExercises.map((exercise) => (
                          <Link
                            key={exercise.exerciseId}
                            href={`/exercise/${exercise.exerciseId}`}
                            className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-white transition-colors border border-transparent hover:border-gray-200 bg-white gap-2"
                          >
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                              <div className="text-base sm:text-xl flex-shrink-0">
                                {exercise.completed ? '✅' : exercise.attempts > 0 ? '🔄' : '⭕'}
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-gray-900 text-xs sm:text-sm truncate">
                                  {exercise.exerciseId}
                                </div>
                                {exercise.attempts > 0 && (
                                  <div className="text-[10px] sm:text-xs text-gray-600 truncate">
                                    {exercise.attempts} attempt{exercise.attempts !== 1 ? 's' : ''}
                                    {exercise.lastPassedAt && (
                                      <span className="hidden sm:inline">
                                        {' '}• Last: {new Date(exercise.lastPassedAt).toLocaleDateString()}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex-shrink-0">
                              {exercise.completed ? (
                                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-50 text-green-700 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                  <span className="hidden sm:inline">Completed</span>
                                  <span className="sm:hidden">Done</span>
                                </span>
                              ) : exercise.attempts > 0 ? (
                                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-50 text-yellow-700 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                  <span className="hidden sm:inline">In Progress</span>
                                  <span className="sm:hidden">WIP</span>
                                </span>
                              ) : (
                                <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap">
                                  <span className="hidden sm:inline">Not Started</span>
                                  <span className="sm:hidden">New</span>
                                </span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
