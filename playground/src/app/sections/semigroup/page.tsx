'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const semigroupExercises = exercises.filter((ex) => ex.category === 'Semigroup')

export default function SemigroupSection() {
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
            Semigroup Module
          </h1>
          <p className="text-gray-600">
            Learn to combine values systematically - the foundation of composable operations
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {semigroupExercises.length}
              </div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Intermediate</div>
              <div className="text-sm text-gray-600">Difficulty</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">~1h</div>
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
                Core Concepts
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Understanding concat operation</li>
                <li>• Combining strings and numbers</li>
                <li>• struct for complex types</li>
                <li>• first, last, min, max patterns</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Practical Applications
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Merging configurations</li>
                <li>• Aggregating statistics</li>
                <li>• Combining analytics data</li>
                <li>• Building reusable combiners</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercises</h2>
          {semigroupExercises.map((exercise) => (
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
                    <span className="px-3 py-1 bg-orange-50 text-orange-700 rounded-full">
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
