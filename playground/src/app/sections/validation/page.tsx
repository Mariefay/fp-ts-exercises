'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const validationExercises = exercises.filter((ex) => ex.category === 'Validation')

export default function ValidationSection() {
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
            Validation Module
          </h1>
          <p className="text-gray-600">
            Accumulate ALL errors instead of failing fast - perfect for form validation
          </p>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-gray-900">
                {validationExercises.length}
              </div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900">Advanced</div>
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
                Core Concepts
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Basic field validation</li>
                <li>• Accumulating errors</li>
                <li>• getApplicativeValidation</li>
                <li>• vs Either fail-fast behavior</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Real-World Patterns
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Form validation</li>
                <li>• Nested validations</li>
                <li>• Payment processing</li>
                <li>• Complex business rules</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exercises</h2>
          {validationExercises.map((exercise) => (
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
                    <span className="px-3 py-1 bg-red-50 text-red-700 rounded-full">
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
