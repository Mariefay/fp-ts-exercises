'use client'

import { useState, useCallback } from 'react'
import { Exercise, TestResult, TestSuite } from '@/types/exercise'
import { testRunner } from '@/utils/testRunner'

interface TestRunnerProps {
  exercise: Exercise
  userCode: string
  onTestRun: (results: TestSuite) => void
  testResults: TestSuite | null
  onShowSolution: () => void
  onResetExercise: () => void
}

export function TestRunner({
  exercise,
  userCode,
  onTestRun,
  testResults,
  onShowSolution,
  onResetExercise,
}: TestRunnerProps) {
  const [isRunning, setIsRunning] = useState(false)

  const runTests = useCallback(async () => {
    setIsRunning(true)
    
    try {
      const results = await testRunner.runCode(userCode)
      onTestRun(results)
    } catch (error) {
      const errorResults: TestSuite = {
        name: exercise.title,
        passed: false,
        total: 1,
        passCount: 0,
        failCount: 1,
        results: [
          {
            passed: false,
            message: 'Test execution failed',
            error: error instanceof Error ? error.message : 'Unknown error',
          },
        ],
      }
      onTestRun(errorResults)
    } finally {
      setIsRunning(false)
    }
  }, [exercise, userCode, onTestRun])

  const showSolution = useCallback(() => {
    onShowSolution()
  }, [onShowSolution])

  const resetExercise = useCallback(() => {
    onResetExercise()
  }, [onResetExercise])

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-teal-500 px-6 py-4">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Test Results
        </h3>
        <div className="flex gap-2 mt-4">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex-1 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 border border-white/30"
          >
            {isRunning ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Running...
              </span>
            ) : 'Run Tests'}
          </button>
          <button
            onClick={showSolution}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            Solution
          </button>
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/30"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Test Results */}
      <div className="flex-1 p-6 overflow-y-auto">
        {testResults ? (
          <div className="space-y-4">
            {/* Summary */}
            <div className={`p-4 rounded-2xl border shadow-soft ${
              testResults.passed 
                ? 'bg-green-50/80 backdrop-blur-sm border-green-200/50' 
                : 'bg-red-50/80 backdrop-blur-sm border-red-200/50'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-lg ${
                  testResults.passed ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResults.passed ? '✅ All Tests Passed!' : '❌ Tests Failed'}
                </span>
                <span className="text-sm text-purple-600 bg-white/60 px-3 py-1 rounded-full">
                  {testResults.passCount}/{testResults.total}
                </span>
              </div>
              {testResults.passed && (
                <p className="text-green-600 text-sm mt-2">
                  Great job! Your solution is working correctly. 🎉
                </p>
              )}
            </div>

            {/* Individual Test Results */}
            <div className="space-y-3">
              {testResults.results.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border shadow-soft ${
                    result.passed
                      ? 'border-green-200/50 bg-green-50/60 backdrop-blur-sm'
                      : 'border-red-200/50 bg-red-50/60 backdrop-blur-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-sm font-medium ${
                      result.passed ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.passed ? '✅' : '❌'} {result.message}
                    </span>
                    {result.duration && (
                      <span className="text-xs text-purple-500 bg-white/60 px-2 py-1 rounded-full">
                        {result.duration.toFixed(1)}ms
                      </span>
                    )}
                  </div>
                  {result.error && (
                    <div className="mt-3 text-xs text-red-700 font-mono bg-red-100/80 backdrop-blur-sm p-3 rounded-lg border border-red-200/50">
                      {result.error}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-purple-500 mt-12">
            <div className="text-6xl mb-6">🧪</div>
            <h4 className="text-lg font-semibold text-purple-700 mb-2">Ready to Test?</h4>
            <p className="text-purple-600">Click &quot;Run Tests&quot; to see how your code performs</p>
          </div>
        )}
      </div>

      {/* Exercise Instructions */}
      <div className="p-6 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 border-t border-purple-200/30">
        <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quick Tips
        </h4>
        <div className="space-y-2 text-sm text-purple-700">
          <p className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Read the TODO comments in the code for guidance
          </p>
          <p className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Use the Reset button to go back to the original code
          </p>
          <p className="flex items-start">
            <span className="text-purple-500 mr-2">•</span>
            Check the Solution if you get stuck
          </p>
        </div>
      </div>
    </div>
  )
}
