'use client'

import Link from 'next/link'
import { exercises } from '@/data/exercises'

const pipeConcepts = [
  {
    title: 'Left-to-Right Flow',
    description: 'Read code in the order it executes',
    icon: '➡️',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'No Nesting',
    description: 'Avoid deeply nested function calls',
    icon: '📏',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Easy to Debug',
    description: 'Step through transformations one at a time',
    icon: '🐛',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Compose Anything',
    description: 'Chain together any sequence of functions',
    icon: '🔗',
    color: 'bg-yellow-100 text-yellow-700'
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
      return 'bg-green-100 text-green-700 border-green-200'
  }
}

export default function PipeSection() {
  const pipeExercises = exercises.filter(ex => ex.category === 'Pipe')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Pipe Function
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The pipe function allows you to compose operations in a left-to-right, readable manner.
            Say goodbye to nested function calls and hello to elegant data transformations!
          </p>
        </div>

        {/* What is Pipe */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Pipe?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Pipe takes a value and passes it through a series of transformations, from left to right.
                It's like a pipeline for your data, making complex transformations easy to read and understand.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Nested (hard to read):`}</div>
                <div className="text-red-600 mb-4">{`square(addTen(double(5)))`}</div>
                <div className="text-gray-600 mb-2">{`// Pipe (readable):`}</div>
                <div className="text-green-600">pipe(5, double, addTen, square)</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {pipeConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pipe in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Nested Functions</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Hard to read, inside-out
const result =
  map(
    filter(
      map(users, u => u.email),
      e => e.includes('@gmail')
    ),
    e => e.toLowerCase()
  )

// Which operation happens first?
// Hard to follow the data flow!`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Pipe Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Clear, left-to-right flow
const result = pipe(
  users,
  map(u => u.email),
  filter(e => e.includes('@gmail')),
  map(e => e.toLowerCase())
)

// Easy to follow!
// Data flows naturally top-to-bottom`}</pre>
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
            {pipeExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Pipe?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">📖</div>
              <h3 className="font-semibold mb-2">Readable Code</h3>
              <p className="text-blue-100">Write code that reads like a story</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold mb-2">Easy Refactoring</h3>
              <p className="text-blue-100">Add, remove, or reorder transformations easily</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Foundation for FP</h3>
              <p className="text-blue-100">Essential pattern for all functional programming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
