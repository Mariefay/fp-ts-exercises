'use client'

import { useProgress } from '@/contexts/ProgressContext'
import Link from 'next/link'

export function Dashboard() {
  const { progress } = useProgress()

  if (progress.totalExercises === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to fp-ts Exercises
            </h1>
            <p className="text-gray-600">
              Start an exercise to begin tracking your progress
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Progress Dashboard
          </h1>
          <p className="text-gray-600">
            Track your functional programming journey with fp-ts
          </p>
        </div>

        {/* Overall Progress */}
        <div className="bg-white rounded-lg p-8 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-900">
              Overall Progress
            </h2>
            <div className="text-4xl font-bold text-blue-600">
              {progress.percentage}%
            </div>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-500 flex items-center justify-center text-white text-sm font-medium"
              style={{ width: `${progress.percentage}%` }}
            >
              {progress.percentage > 10 && `${progress.percentage}%`}
            </div>
          </div>

          <div className="flex items-center justify-between text-gray-700">
            <span>
              {progress.completedExercises} of {progress.totalExercises} exercises completed
            </span>
            <span className="text-sm">
              {progress.totalExercises - progress.completedExercises} remaining
            </span>
          </div>
        </div>

        {/* Module Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {progress.modules.map((module) => (
            <div
              key={module.moduleName}
              className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {module.moduleName}
              </h3>

              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="transform -rotate-90 w-20 h-20">
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="40"
                    cy="40"
                    r="32"
                    stroke="#2563eb"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(module.percentage / 100) * 201} 201`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">
                    {module.percentage}%
                  </span>
                </div>
              </div>

              <div className="text-center text-sm text-gray-600">
                {module.completedExercises} / {module.totalExercises} complete
              </div>
            </div>
          ))}
        </div>

        {/* Exercise List by Module */}
        <div className="space-y-6">
          {progress.modules.map((module) => {
            const moduleExercises = progress.exercises.filter((ex) =>
              ex.exerciseId.startsWith(module.moduleName.toLowerCase())
            )

            return (
              <div
                key={module.moduleName}
                className="bg-white rounded-lg p-6 border border-gray-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {module.moduleName} Exercises
                </h3>

                <div className="space-y-2">
                  {moduleExercises.map((exercise) => (
                    <Link
                      key={exercise.exerciseId}
                      href={`/exercise/${exercise.exerciseId}`}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">
                          {exercise.completed ? '✅' : exercise.attempts > 0 ? '🔄' : '⭕'}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {exercise.exerciseId}
                          </div>
                          {exercise.attempts > 0 && (
                            <div className="text-xs text-gray-600">
                              {exercise.attempts} attempt{exercise.attempts !== 1 ? 's' : ''}
                              {exercise.lastPassedAt && ' • Last passed: '}
                              {exercise.lastPassedAt &&
                                new Date(exercise.lastPassedAt).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        {exercise.completed ? (
                          <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                            Completed
                          </span>
                        ) : exercise.attempts > 0 ? (
                          <span className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">
                            In Progress
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                            Not Started
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
