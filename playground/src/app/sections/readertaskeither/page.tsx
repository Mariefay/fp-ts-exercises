'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const rteConcepts = [
  {
    title: 'Triple Power',
    description: 'Reader + Task + Either combined',
    icon: '🎯',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Production Ready',
    description: 'Real-world app architecture',
    icon: '🚀',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Testable',
    description: 'Mock dependencies easily',
    icon: '🧪',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Type-Safe',
    description: 'Dependencies, errors, async all typed',
    icon: '✅',
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

export default function ReaderTaskEitherSection() {
  const rteExercises = exercises.filter((ex) => ex.category === 'Readertaskeither')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            ReaderTaskEither Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The ultimate composition: Reader (dependency injection) + Task (async) + Either (error handling).
            Master this and you've mastered functional effects for real-world applications.
          </p>
        </div>

        {/* What is ReaderTaskEither */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is ReaderTaskEither?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                ReaderTaskEither (RTE) combines three powerful abstractions: Reader for dependency injection,
                Task for lazy async operations, and Either for type-safe error handling. It's the go-to type
                for building production applications with testable, composable, and maintainable code.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Type signature:`}</div>
                <div className="text-green-600 mb-4">{`ReaderTaskEither<Env, Error, Value>`}</div>
                <div className="text-gray-600 mb-2">{`// Example:`}</div>
                <div className="text-green-600">RTE&lt;Config, ApiError, User&gt;</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {rteConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">ReaderTaskEither in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Traditional Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`async function getUser(id: number) {
  const config = getGlobalConfig() // Global!
  try {
    const response = await fetch(
      \`\${config.apiUrl}/users/\${id}\`
    )
    if (!response.ok) throw new Error('Failed')
    return await response.json()
  } catch (e) {
    console.error(e) // Untyped!
    throw e
  }
}

// Hard to test, global state, untyped errors`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ ReaderTaskEither Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const getUser = (id: number): RTE<Config, ApiError, User> =>
  pipe(
    RTE.ask<Config>(),
    RTE.chain(config =>
      RTE.tryCatch(
        () => fetch(\`\${config.apiUrl}/users/\${id}\`),
        toApiError
      )
    ),
    RTE.chain(parseResponse)
  )

// Testable, no globals, typed errors!
const result = getUser(123)(mockConfig)()`}</pre>
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
            {rteExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn ReaderTaskEither?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-blue-100">Real-world app architecture patterns</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🧪</div>
              <h3 className="font-semibold mb-2">Highly Testable</h3>
              <p className="text-blue-100">Mock any dependency easily</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">Type-Safe</h3>
              <p className="text-blue-100">Dependencies, errors, async all typed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
