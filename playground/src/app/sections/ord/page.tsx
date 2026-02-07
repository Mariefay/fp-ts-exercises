'use client'

import { exercises } from '@/data/generated-exercises'
import Link from 'next/link'

export default function OrdSection() {
  const ordExercises = exercises.filter(ex => ex.module === 'ord')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/sections"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Sections
        </Link>

        <h1 className="text-4xl font-bold mb-4">Ord</h1>
        <p className="text-gray-600 mb-8">
          Define custom ordering and comparison logic for any type. Ord enables type-safe sorting,
          finding min/max values, and comparing complex data structures. Learn to derive orderings,
          reverse them, and compose multiple sorting criteria.
        </p>

        <div className="space-y-4">
          {ordExercises.map((exercise) => (
            <Link
              key={exercise.id}
              href={`/editor/${exercise.module}/${exercise.number}`}
              className="block p-6 bg-white border border-gray-200 hover:border-blue-500 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    {exercise.number}. {exercise.title}
                  </h2>
                  <p className="text-gray-600">{exercise.description}</p>
                </div>
                <span className="text-blue-600">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
