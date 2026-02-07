'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const monoidConcepts = [
  {
    title: 'Empty Value',
    description: 'Identity element for safe defaults',
    icon: '⭕',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Safe Aggregation',
    description: 'Handle empty arrays gracefully',
    icon: '✅',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Concat + Empty',
    description: 'Semigroup with a neutral element',
    icon: '➕',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Universal',
    description: 'Works with any combinable type',
    icon: '🌐',
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

export default function MonoidSection() {
  const monoidExercises = exercises.filter((ex) => ex.category === 'Monoid')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Monoid Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Semigroup + identity element. Monoids add a neutral "empty" value to Semigroup's concat operation,
            enabling safe aggregation over empty collections and elegant default value handling.
          </p>
        </div>

        {/* What is Monoid */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Monoid?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                A Monoid is a Semigroup with an identity element (empty). This empty value acts as a neutral
                element in concat operations. It enables safe aggregation over empty arrays, default values,
                and composable data transformations without special null/undefined checks.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Semigroup - no empty case:`}</div>
                <div className="text-red-600 mb-4">{`concatAll(semigroup)(items) // Error if empty!`}</div>
                <div className="text-gray-600 mb-2">{`// Monoid - handles empty:`}</div>
                <div className="text-green-600">concatAll(monoid)(items) // Returns empty value</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {monoidConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Monoid in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Without Monoid</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`function sumAll(numbers: number[]) {
  if (numbers.length === 0) {
    return 0 // Manual check!
  }
  return numbers.reduce((a, b) => a + b)
}

function mergeConfigs(configs: Config[]) {
  if (configs.length === 0) {
    return defaultConfig // Special case!
  }
  // merge logic...
}

// Every function needs null checks`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Monoid Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const sumAll = M.concatAll(N.MonoidSum)

const mergeConfigs = M.concatAll(
  M.struct({
    theme: S.last(),
    features: A.getMonoid()
  })
)

// Handles empty automatically!
sumAll([]) // 0
mergeConfigs([]) // { theme: none, features: [] }`}</pre>
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
            {monoidExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Monoid?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">Safe Defaults</h3>
              <p className="text-blue-100">No more null checks for empty cases</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Data Aggregation</h3>
              <p className="text-blue-100">Combine any number of values safely</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-semibold mb-2">Composability</h3>
              <p className="text-blue-100">Build complex operations from simple ones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
