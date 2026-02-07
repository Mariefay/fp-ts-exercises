'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const ioConcepts = [
  {
    title: 'Lazy Side Effects',
    description: 'Defer execution until needed',
    icon: '⏱️',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Synchronous',
    description: 'No async complexity',
    icon: '🔄',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Testable',
    description: 'Control when effects execute',
    icon: '🧪',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Type-Safe',
    description: 'IOEither for error handling',
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

export default function IOSection() {
  const ioExercises = exercises.filter((ex) => ex.category === 'Io')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            IO Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Handle synchronous side effects with type safety. IO represents lazy computations that always succeed,
            while IOEither adds error handling for operations like JSON parsing and config loading.
          </p>
        </div>

        {/* What is IO */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is IO?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                IO represents a synchronous side effect that will always succeed. Unlike direct execution, IO
                is lazy - it describes an effect without executing it. IOEither extends this with error handling,
                perfect for console I/O, random numbers, timestamps, JSON parsing, and config loading.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Direct execution - side effect now:`}</div>
                <div className="text-red-600 mb-4">{`const time = Date.now() // Already executed!`}</div>
                <div className="text-gray-600 mb-2">{`// IO - lazy execution:`}</div>
                <div className="text-green-600">const getTime: IO&lt;number&gt; = () =&gt; Date.now()</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {ioConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">IO in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Direct Execution</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Side effects execute immediately
const time = Date.now()
console.log('Current time:', time)

function parseConfig(json: string) {
  try {
    return JSON.parse(json)
  } catch (e) {
    throw e // Untyped error!
  }
}

// Hard to test, immediate execution`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ IO Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Lazy - only executes when called
const getTime: IO<number> =
  () => Date.now()

const parseConfig = (json: string): IOE<Error, Config> =>
  IOE.tryCatch(
    () => JSON.parse(json),
    (e) => new Error('Parse failed')
  )

// Testable, controlled execution
const time = getTime() // Execute when needed`}</pre>
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
            {ioExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn IO?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-semibold mb-2">Lazy Execution</h3>
              <p className="text-blue-100">Control when side effects happen</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🧪</div>
              <h3 className="font-semibold mb-2">Testable</h3>
              <p className="text-blue-100">Easier to test effectful code</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="font-semibold mb-2">Type-Safe Errors</h3>
              <p className="text-blue-100">IOEither for explicit error handling</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
