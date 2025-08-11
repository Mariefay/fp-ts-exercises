'use client'

import { useState, useCallback, useMemo, use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CodeEditor } from '@/components/CodeEditor'
import { TestRunner } from '@/components/TestRunner'
import { exercises } from '@/data/exercises'
import { TestSuite } from '@/types/exercise'

export default function ExercisePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  const exercise = exercises.find(ex => ex.id === id)
  if (!exercise) {
    notFound()
  }

  const [userCode, setUserCode] = useState<string>(exercise.exerciseCode)
  const [testResults, setTestResults] = useState<TestSuite | null>(null)

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
  }, [])

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Navigation Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Back to section */}
            <Link 
              href={`/sections/${exercise.category.toLowerCase()}`}
              className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">{exercise.category}</span>
            </Link>

            {/* Center: Exercise info */}
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <h1 className="text-xl font-bold text-purple-800">{exercise.title}</h1>
                <div className="flex items-center justify-center space-x-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                    {exercise.difficulty}
                  </span>
                  <span className="text-sm text-purple-500">
                    Exercise {exercise.order} of {exercises.filter(ex => ex.category === exercise.category).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Exercise navigation */}
            <div className="flex items-center space-x-2">
              {previousExercise ? (
                <Link
                  href={`/exercise/${previousExercise.id}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Previous</span>
                </Link>
              ) : (
                <div className="px-4 py-2 bg-purple-200 text-purple-400 rounded-xl cursor-not-allowed">
                  <span>Previous</span>
                </div>
              )}
              
              {nextExercise ? (
                <Link
                  href={`/exercise/${nextExercise.id}`}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <span>Next</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ) : (
                <div className="px-4 py-2 bg-purple-200 text-purple-400 rounded-xl cursor-not-allowed">
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
          <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-purple-100 shadow-soft">
            <h2 className="text-2xl font-bold text-purple-800 mb-4">
              {exercise.title}
            </h2>
            <p className="text-lg text-purple-600 leading-relaxed">
              {exercise.description}
            </p>
          </div>
        </div>

        {/* Code and Test Area */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Code Editor - Takes up 2 columns for more space */}
          <div className="xl:col-span-2">
            <div className="bg-white backdrop-blur-sm rounded-2xl border border-purple-100 shadow-soft overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Code Editor
                </h3>
                <p className="text-purple-100 text-sm mt-1">
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
            <div className="bg-white backdrop-blur-sm rounded-2xl border border-purple-100 shadow-soft overflow-hidden h-full">
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
          <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-8 text-white">
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              Pro Tips
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">💡 Stuck? Here&apos;s what to try:</h4>
                <ul className="text-purple-100 space-y-1 text-sm">
                  <li>• Read the comments in the code carefully</li>
                  <li>• Run tests frequently to get feedback</li>
                  <li>• Check the fp-ts documentation</li>
                  <li>• Use the solution if you need help</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🚀 Learning Approach:</h4>
                <ul className="text-purple-100 space-y-1 text-sm">
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
