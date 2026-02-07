'use client'

import Link from 'next/link'
import { exercises } from '@/data/generated-exercises'

const validationConcepts = [
  {
    title: 'Accumulate Errors',
    description: 'Collect all validation failures',
    icon: '📋',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'No Short-Circuit',
    description: 'Unlike Either, runs all validations',
    icon: '🔄',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Better UX',
    description: 'Show users all errors at once',
    icon: '✨',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    title: 'Form Validation',
    description: 'Perfect for complex form logic',
    icon: '📝',
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

export default function ValidationSection() {
  const validationExercises = exercises.filter((ex) => ex.category === 'Validation')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Validation Module
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Accumulate ALL errors instead of failing fast. Perfect for form validation where users need to see
            every validation error at once, not one at a time.
          </p>
        </div>

        {/* What is Validation */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Validation?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Validation is like Either, but instead of short-circuiting on the first error, it accumulates
                all errors using a Semigroup. This is essential for user-facing forms where showing all validation
                errors at once creates a better experience than revealing them one by one.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Either - stops at first error:`}</div>
                <div className="text-red-600 mb-4">{`validateForm(data) // Left("Name required")`}</div>
                <div className="text-gray-600 mb-2">{`// Validation - collects all:`}</div>
                <div className="text-green-600">validateForm(data) // Left(["Name required", "Email invalid"])</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {validationConcepts.map((concept, index) => (
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Validation in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Either Approach (Fail Fast)</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const validateUser = (data: FormData) =>
  pipe(
    E.Do,
    E.bind('name', () =>
      data.name ? E.right(data.name)
                : E.left('Name required')
    ),
    E.bind('email', () =>
      isEmail(data.email) ? E.right(data.email)
                          : E.left('Invalid email')
    )
  )

// Only shows first error!`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Validation Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`const V = E.getApplicativeValidation(
  A.getSemigroup<string>()
)

const validateUser = (data: FormData) =>
  pipe(
    sequenceS(V)({
      name: data.name ? E.right(data.name)
                      : E.left(['Name required']),
      email: isEmail(data.email) ? E.right(data.email)
                                  : E.left(['Invalid email'])
    })
  )

// Shows ALL errors at once!`}</pre>
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
            {validationExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Validation?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="font-semibold mb-2">Better UX</h3>
              <p className="text-blue-100">Show all errors to users at once</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="font-semibold mb-2">Form Validation</h3>
              <p className="text-blue-100">Essential for complex form logic</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-semibold mb-2">Complete Feedback</h3>
              <p className="text-blue-100">Collect all issues in one pass</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
