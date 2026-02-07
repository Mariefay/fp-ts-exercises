'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const nonEmptyArrayConcepts = [
  {
    title: 'Never Empty',
    description: 'Guaranteed at least one element',
    icon: '✅',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Type Safety',
    description: 'No need to check for empty arrays',
    icon: '🛡️',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Safe Operations',
    description: 'head, last, max, min always work',
    icon: '🔒',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Better APIs',
    description: 'Express intent in types',
    icon: '🎯',
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

export default function NonEmptyArraySection() {
  const nonEmptyArrayExercises = exercises.filter((ex) => ex.category === 'NonEmptyArray')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            NonEmptyArray Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Work with arrays that are guaranteed to have at least one element. Enables type-safe operations
            like head, last, max, and min without runtime checks.
          </p>
        </div>

        {/* What is NonEmptyArray */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is NonEmptyArray?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                NonEmptyArray is an array with at least one element, guaranteed by the type system. This eliminates
                entire classes of runtime errors by making emptiness impossible. Operations like head, last, max,
                and min can safely return values without Option wrapping.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Regular array - might be empty:`}</div>
                <div className="text-red-600 mb-4">{`arr[0] // undefined?`}</div>
                <div className="text-gray-600 mb-2">{`// NonEmptyArray - always has items:`}</div>
                <div className="text-green-600">NEA.head(arr) // always returns a value</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {nonEmptyArrayConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">NonEmptyArray in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Regular Array Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`function getFirst(arr: number[]) {
  if (arr.length === 0) {
    throw new Error('Array is empty!')
  }
  return arr[0]
}

function findMax(arr: number[]) {
  if (arr.length === 0) {
    return undefined // or throw?
  }
  return Math.max(...arr)
}

// Manual checks everywhere!`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ NonEmptyArray Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`function getFirst(arr: NonEmptyArray<number>) {
  return NEA.head(arr)
  // No check needed - type guarantees it!
}

function findMax(arr: NonEmptyArray<number>) {
  return pipe(
    arr,
    NEA.max(N.Ord)
  ) // Always returns a value
}

// Type system handles safety!`}</pre>
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
            {nonEmptyArrayExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn NonEmptyArray?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🛡️</div>
              <h3 className="font-semibold mb-2">Type Safety</h3>
              <p className="text-blue-100">Eliminate empty array runtime errors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Better APIs</h3>
              <p className="text-blue-100">Express intent clearly in types</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔒</div>
              <h3 className="font-semibold mb-2">Safe Operations</h3>
              <p className="text-blue-100">head, last, max, min always work</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
