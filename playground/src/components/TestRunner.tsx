'use client'

import { useState, useCallback } from 'react'
import { Exercise, TestSuite } from '@/types/exercise'
import { typescriptTestRunner } from '@/utils/typescriptTestRunner'

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
      // Combine user code with test code for execution
      const results = await typescriptTestRunner.runCodeWithTests(userCode, exercise.testCode)
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
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Test Results
        </h3>
        <div className="flex gap-2 mt-4">
          <button
            onClick={runTests}
            disabled={isRunning}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            aria-label="Run tests for current exercise"
            aria-busy={isRunning}
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
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Solution
          </button>
          <button
            onClick={resetExercise}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Requirements Section */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
          <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
          Requirements
        </h4>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <pre className="text-xs text-gray-700 font-mono overflow-x-auto">
            {exercise.testCode}
          </pre>
        </div>
      </div>

      {/* Test Results */}
      <div className="flex-1 p-6 overflow-y-auto">
        {testResults ? (
          <div className="space-y-4">
            {/* Summary */}
            <div className={`p-4 rounded-lg border ${
              testResults.passed
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className={`font-semibold text-base ${
                  testResults.passed ? 'text-green-900' : 'text-red-900'
                }`}>
                  {testResults.passed ? '✅ All Tests Passed!' : '❌ Tests Failed'}
                </span>
                <span className="text-sm text-gray-700 bg-white px-3 py-1 rounded-md border border-gray-200">
                  {testResults.passCount}/{testResults.total}
                </span>
              </div>
              {testResults.passed && (
                <p className="text-green-700 text-sm mt-2">
                  Great job! Your solution is working correctly. 🎉
                </p>
              )}
            </div>

            {/* Individual Test Results */}
            <div className="space-y-2">
              {testResults.results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    result.passed
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className={`text-sm ${
                      result.passed ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {result.passed ? '✅' : '❌'} {result.message}
                    </span>
                    {result.duration && (
                      <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-200">
                        {result.duration.toFixed(1)}ms
                      </span>
                    )}
                  </div>
                  {result.error && (
                    <div className="mt-3 text-xs text-red-900 bg-red-100 p-3 rounded border border-red-200">
                      <pre className="whitespace-pre-wrap font-mono leading-relaxed">
                        {result.error}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12">
            <div className="text-6xl mb-6">🧪</div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Ready to Test?</h4>
            <p className="text-gray-600">Click &quot;Run Tests&quot; to see how your code performs</p>
          </div>
        )}
      </div>

      {/* Exercise Instructions */}
      <div className="p-6 bg-blue-50 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3 flex items-center text-sm">
          <svg className="w-4 h-4 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Quick Tips
        </h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Read the TODO comments in the code for guidance
          </p>
          <p className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Use the Reset button to go back to the original code
          </p>
          <p className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            Check the Solution if you get stuck
          </p>
        </div>
      </div>
    </div>
  )
}
