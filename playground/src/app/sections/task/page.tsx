'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const taskConcepts = [
  {
    title: 'Lazy Async',
    description: 'Deferred async computations',
    icon: '⏱️',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Always Succeeds',
    description: 'No error handling needed',
    icon: '✅',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Composable',
    description: 'Chain and combine async work',
    icon: '🔗',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Parallel Ready',
    description: 'Run multiple tasks concurrently',
    icon: '⚡',
    color: 'bg-blue-50 text-blue-700'
  }
]

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'advanced':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-blue-100 text-blue-700 border-blue-200'
  }
}

export default function TaskSection() {
  const taskExercises = exercises.filter((ex) => ex.category === 'Task')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Task Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Lazy async computations that always succeed. Task represents asynchronous operations without
            error handling, perfect for timing operations, delays, and async work that won't fail.
          </p>
        </div>

        {/* What is Task */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Task?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Task is a lazy async computation that always succeeds. Unlike Promise which executes immediately,
                Task is evaluated only when explicitly run. Unlike TaskEither, Task has no error channel - it
                represents operations that are guaranteed to succeed.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Promise - executes immediately:`}</div>
                <div className="text-red-600 mb-4">{`const p = fetch('/api') // Already running!`}</div>
                <div className="text-gray-600 mb-2">{`// Task - lazy evaluation:`}</div>
                <div className="text-green-600">const t = T.of(fetch('/api')) // Not running yet</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {taskConcepts.map((concept, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${concept.color}`}>
                    <span>{concept.icon}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{concept.title}</h3>
                  <p className="text-sm text-gray-600">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Task in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Promise Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Executes immediately
const delay = (ms: number) =>
  new Promise(resolve =>
    setTimeout(resolve, ms)
  )

// Already started running
const task1 = delay(1000)
const task2 = delay(1000)

// Hard to compose and test`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Task Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Lazy - won't execute until called
const delay = (ms: number): Task<void> =>
  () => new Promise(resolve =>
    setTimeout(resolve, ms)
  )

// Not running yet - just descriptions
const task1 = delay(1000)
const task2 = delay(1000)

// Composable and testable!`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Practice Exercises
          </h2>
          <div className="grid gap-6">
            {taskExercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {exercise.title}
                      </h3>
                      <p className="text-gray-600">{exercise.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <Link
                      href={`/exercise/${exercise.id}`}
                      className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
                    >
                      Start Exercise
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-blue-600 rounded-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Task?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-semibold mb-2">Lazy Evaluation</h3>
              <p className="text-blue-100">Control when async work executes</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-semibold mb-2">Composability</h3>
              <p className="text-blue-100">Chain and combine async operations</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Parallel Execution</h3>
              <p className="text-blue-100">Run multiple tasks concurrently</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
