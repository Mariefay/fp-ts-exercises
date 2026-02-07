'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const arrayConceptsGrid = [
  {
    title: 'Immutable Operations',
    description: 'Transform data without mutations',
    icon: '🔒',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Composable',
    description: 'Chain operations with ease',
    icon: '🔗',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Type-Safe',
    description: 'Compile-time guarantees',
    icon: '✅',
    color: 'bg-green-50 text-green-700'
  },
  {
    title: 'Functional',
    description: 'Pure, predictable transformations',
    icon: '⚡',
    color: 'bg-yellow-50 text-yellow-700'
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
      return 'bg-purple-100 text-purple-700 border-purple-200'
  }
}

export default function ArraySection() {
  const arrayExercises = exercises.filter((ex) => ex.category === 'Array')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Array Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master functional array operations - the foundation of data transformation.
            Work with collections safely and elegantly using pure, composable functions.
          </p>
        </div>

        {/* What is Array */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is fp-ts Array?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                fp-ts provides functional utilities for working with arrays. Unlike imperative approaches,
                these operations are immutable, composable, and type-safe. Master map, filter, reduce,
                and advanced patterns for transforming collections.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Instead of mutation:`}</div>
                <div className="text-red-600 mb-4">{`arr.push(item); arr.sort()`}</div>
                <div className="text-gray-600 mb-2">{`// Use functional approach:`}</div>
                <div className="text-green-600">pipe(arr, A.append(item), A.sort(ordNumber))</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {arrayConceptsGrid.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Array in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Imperative Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const users = getUsers()
const result = []
for (let i = 0; i < users.length; i++) {
  if (users[i].age >= 18) {
    result.push(users[i].name.toUpperCase())
  }
}
result.sort()

// Mutations, loops, manual index tracking`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ fp-ts Array Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const result = pipe(
  getUsers(),
  A.filter(u => u.age >= 18),
  A.map(u => u.name.toUpperCase()),
  A.sort(ordString)
)

// Declarative, immutable, composable!`}</pre>
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
            {arrayExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn fp-ts Array?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Data Transformation</h3>
              <p className="text-blue-100">Transform collections safely and efficiently</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔗</div>
              <h3 className="font-semibold mb-2">Composability</h3>
              <p className="text-blue-100">Chain operations into powerful pipelines</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Foundation</h3>
              <p className="text-blue-100">Essential for all functional programming</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
