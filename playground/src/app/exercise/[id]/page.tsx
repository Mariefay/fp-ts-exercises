'use client'

import { useState, useCallback, useMemo, use, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CodeEditor } from '@/components/CodeEditor'
import { TestRunner } from '@/components/TestRunner'
import { exercises } from '@/data/exercises'
import { TestSuite } from '@/types/exercise'
import { useProgress } from '@/contexts/ProgressContext'

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const exercise = exercises.find(ex => ex.id === id)
  if (!exercise) {
    notFound()
  }

  const [userCode, setUserCode] = useState<string>(exercise.exerciseCode)
  const [testResults, setTestResults] = useState<TestSuite | null>(null)
  const { calculateProgress, recordAttempt, markExerciseComplete, isExerciseComplete } = useProgress()

  // Calculate progress when exercises are loaded
  useEffect(() => {
    calculateProgress(exercises)
  }, [calculateProgress])

  // Find previous and next exercises
  const { previousExercise, nextExercise } = useMemo(() => {
    const currentIndex = exercises.findIndex(ex => ex.id === id)
    return {
      previousExercise: currentIndex > 0 ? exercises[currentIndex - 1] : null,
      nextExercise: currentIndex < exercises.length - 1 ? exercises[currentIndex + 1] : null
    }
  }, [id])

  const handleCodeChange = useCallback((code: string) => {
    setUserCode(code)
  }, [])

  const handleShowSolution = useCallback(() => {
    setUserCode(exercise.solutionCode)
  }, [exercise])

  const handleResetExercise = useCallback(() => {
    setUserCode(exercise.exerciseCode)
    setTestResults(null)
  }, [exercise])

  const handleTestRun = useCallback((results: TestSuite) => {
    setTestResults(results)
    recordAttempt(exercise.id)

    // Mark as complete if all tests passed
    if (results.passed) {
      markExerciseComplete(exercise.id)
    }
  }, [exercise.id, recordAttempt, markExerciseComplete])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 border-green-200'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200'
      case 'advanced':
        return 'bg-red-100 text-red-700 border-red-200'
      default:
        return 'bg-purple-100 text-purple-700 border-purple-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back to section */}
            <Link
              href={`/sections/${exercise.category.toLowerCase()}`}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">{exercise.category}</span>
            </Link>

            {/* Center: Exercise info */}
            <div className="flex items-center space-x-4">
              {isExerciseComplete(exercise.id) && (
                <div className="text-2xl">✅</div>
              )}
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-900">{exercise.title}</h1>
                <div className="flex items-center justify-center space-x-3 mt-1">
                  <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-sm text-gray-600">
                    Exercise {exercise.order} of {exercises.filter(ex => ex.category === exercise.category).length}
                  </span>
                  {isExerciseComplete(exercise.id) && (
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right: Exercise navigation */}
            <div className="flex items-center space-x-2">
              {previousExercise ? (
                <Link
                  href={`/exercise/${previousExercise.id}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </Link>
              ) : (
                <div className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                  <span>Previous</span>
                </div>
              )}

              {nextExercise ? (
                <Link
                  href={`/exercise/${nextExercise.id}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg cursor-not-allowed">
                  <span>Next</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Exercise Description */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {exercise.title}
            </h2>
            <p className="text-base text-gray-600 leading-relaxed">
              {exercise.description}
            </p>
          </div>
        </div>

        {/* Code and Test Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Code Editor - Takes up 2 columns for more space */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-white border-b border-gray-200 px-6 py-4">
                <h3 className="text-base font-semibold text-gray-900 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Editor
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {exercise.fileName}
                </p>
              </div>
              <div className="h-[500px] xl:h-[600px]">
                <CodeEditor
                  code={userCode}
                  onChange={handleCodeChange}
                  fileName={exercise.fileName}
                />
              </div>
            </div>
          </div>

          {/* Test Runner - Takes up 1 column */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full">
              <TestRunner
                exercise={exercise}
                userCode={userCode}
                onTestRun={handleTestRun}
                testResults={testResults}
                onShowSolution={handleShowSolution}
                onResetExercise={handleResetExercise}
              />
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8">
          <div className="bg-blue-50 rounded-lg p-8 border border-blue-100">
            <h3 className="text-lg font-bold mb-4 flex items-center text-gray-900">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Pro Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">💡 Stuck? Here&apos;s what to try:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Read the comments in the code carefully</li>
                  <li>• Run tests frequently to get feedback</li>
                  <li>• Check the fp-ts documentation</li>
                  <li>• Use the solution if you need help</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-900">🚀 Learning Approach:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Focus on understanding, not just solving</li>
                  <li>• Experiment with different approaches</li>
                  <li>• Think about real-world applications</li>
                  <li>• Build on previous exercises</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
