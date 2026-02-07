'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const readerConcepts = [
  {
    title: 'Dependency Injection',
    description: 'Pass config without globals',
    icon: '💉',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Testable',
    description: 'Easy to mock dependencies',
    icon: '🧪',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Composable',
    description: 'Chain operations with shared context',
    icon: '🔗',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Pure Functions',
    description: 'No hidden dependencies',
    icon: '✨',
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

export default function ReaderSection() {
  const readerExercises = exercises.filter((ex) => ex.category === 'Reader')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Reader Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dependency injection without global state. Reader enables testable, composable code by explicitly
            passing dependencies through function composition.
          </p>
        </div>

        {/* What is Reader */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Reader?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Reader is a computation that depends on some context (environment). Instead of using global
                variables or prop drilling, Reader threads dependencies through your program in a type-safe,
                composable way. It's functional dependency injection that makes testing trivial.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Global state - hard to test:`}</div>
                <div className="text-red-600 mb-4">{`const config = getGlobalConfig()`}</div>
                <div className="text-gray-600 mb-2">{`// Reader - explicit dependencies:`}</div>
                <div className="text-green-600">const program: Reader&lt;Config, Result&gt; = ...</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {readerConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Reader in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Global State Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Global singleton
const CONFIG = loadConfig()

function getApiUrl() {
  return CONFIG.apiUrl // Hidden dependency!
}

function fetchUser(id: number) {
  const url = getApiUrl()
  return fetch(\`\${url}/users/\${id}\`)
}

// Hard to test - CONFIG is global`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Reader Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const getApiUrl: Reader<Config, string> =
  R.asks(config => config.apiUrl)

const fetchUser = (id: number): Reader<Config, Promise<User>> =>
  pipe(
    getApiUrl,
    R.map(url => fetch(\`\${url}/users/\${id}\`))
  )

// Easy to test - pass any config!
const result = fetchUser(123)({ apiUrl: 'http://test' })`}</pre>
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
            {readerExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Reader?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🧪</div>
              <h3 className="font-semibold mb-2">Testability</h3>
              <p className="text-blue-100">Easy to mock and test with different configs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">💉</div>
              <h3 className="font-semibold mb-2">Dependency Injection</h3>
              <p className="text-blue-100">Functional DI without frameworks</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Pure Functions</h3>
              <p className="text-blue-100">No hidden global state</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
