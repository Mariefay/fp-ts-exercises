'use client'

import { exercises } from '@/data/generated-exercises'
import Link from 'next/link'

export default function ReaderSection() {
  const readerExercises = exercises.filter(ex => ex.module === 'reader')

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/sections"
          className="text-gray-600 hover:text-gray-900 mb-6 inline-block"
        >
          ← Back to Sections
        </Link>

        <h1 className="text-4xl font-bold mb-4">Reader</h1>
        <p className="text-gray-600 mb-8">
          Manage dependencies without global state. Reader provides elegant dependency injection
          by passing configuration and services through your computation chain. Perfect for
          testable code that needs access to environment variables, database connections, or services.
        </p>

        <div className="space-y-4">
          {readerExercises.map((exercise) => (
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
