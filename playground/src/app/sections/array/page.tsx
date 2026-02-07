'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const arrayExercises = exercises.filter((ex) => ex.category === 'Array')

export default function ArraySection() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/sections"
            className="text-blue-600 hover:text-blue-700 mb-4 inline-block"
          >
            ← Back to Sections
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Array Module
          </h1>
          <p className="text-gray-600">
            Master functional array operations - the foundation of data transformation
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {arrayExercises.length}
              </div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Beginner</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">~2h</div>
              <div className="text-sm text-gray-600">Duration</div>
            </div>
          </div>
        </div>

        {/* What You'll Learn */}
        <div className="bg-white rounded-lg p-8 mb-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Core Operations
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Map, filter, and reduce</li>
                <li>• Finding and searching elements</li>
                <li>• Partitioning arrays</li>
                <li>• Sorting with Ord</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Advanced Techniques
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Chaining transformations</li>
                <li>• FlatMap for nested arrays</li>
                <li>• Compact for Option arrays</li>
                <li>• Real-world data pipelines</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercises</h2>
          {arrayExercises.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/exercise/${exercise.id}`}
              className="block bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {exercise.title}
                  </h3>
                  <p className="text-gray-600 mb-3">{exercise.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                      {exercise.difficulty}
                    </span>
                    <span>Exercise {exercise.order}</span>
                  </div>
                </div>
                <div className="text-blue-600 text-2xl">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
