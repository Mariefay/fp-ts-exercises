'use client'

import Link from 'next/link'
import { exercises } from '@/data/exercises'

const flowConcepts = [
  {
    title: 'Reusable Pipelines',
    description: 'Create functions that can be used anywhere',
    icon: '♻️',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Point-Free Style',
    description: 'Define transformations without naming parameters',
    icon: '✨',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Function Composition',
    description: 'Build complex operations from simple parts',
    icon: '🏗️',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Type-Safe',
    description: 'Compiler ensures all functions connect properly',
    icon: '🔒',
    color: 'bg-green-100 text-green-700'
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
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
  }
}

export default function FlowSection() {
  const flowExercises = exercises.filter(ex => ex.category === 'Flow')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Flow Function
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Flow is like pipe, but creates reusable function pipelines. Define a transformation once,
            and use it anywhere. It's the key to building modular, composable applications!
          </p>
        </div>

        {/* What is Flow */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Flow?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Flow composes functions into a new function. While pipe executes transformations immediately,
                flow creates a reusable transformation that can be called multiple times with different inputs.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Pipe (executes immediately):`}</div>
                <div className="text-red-600 mb-4">{`pipe(5, double, addTen) // 20`}</div>
                <div className="text-gray-600 mb-2">{`// Flow (creates function):`}</div>
                <div className="text-green-600">{`const process = flow(double, addTen)`}</div>
                <div className="text-green-600">{`process(5) // 20`}</div>
                <div className="text-green-600">{`process(3) // 16`}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {flowConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Flow in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Repeating Logic</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Same transformation repeated
const process1 = pipe(
  data1,
  validate,
  transform,
  save
)

const process2 = pipe(
  data2,
  validate,
  transform,
  save
)

// Duplicated code!`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Flow Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`// Reusable pipeline
const processData = flow(
  validate,
  transform,
  save
)

const result1 = processData(data1)
const result2 = processData(data2)

// DRY! Reusable! Composable!`}</pre>
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
            {flowExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Flow?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">♻️</div>
              <h3 className="font-semibold mb-2">Reusability</h3>
              <p className="text-blue-100">Create once, use everywhere in your codebase</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Composability</h3>
              <p className="text-blue-100">Build complex behaviors from simple functions</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-blue-100">Write maintainable, testable application code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
