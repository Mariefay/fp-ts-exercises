'use client'

import Link from 'next/link'
import { exercises } from '@/data/exercises'

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

export default function EitherSection() {
  const eitherExercises = exercises.filter(ex => ex.category === 'Either')

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Either Type
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Either represents values with two possibilities: a Left (typically an error) or a Right (a success value).
            Perfect for operations that can fail with meaningful error messages.
          </p>
        </div>

        {/* What is Either */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is Either?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 leading-relaxed mb-6">
                Either is a data type that represents a choice between two values: Left (conventionally used for errors)
                and Right (for success values). Unlike exceptions, Either makes error handling explicit and type-safe.
              </p>
              <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
                <div className="text-gray-600 mb-2">{`// Traditional error handling:`}</div>
                <div className="text-red-600 mb-4">{`try { const user = getUser() } catch (e) { }`}</div>
                <div className="text-gray-600 mb-2">{`// Either approach:`}</div>
                <div className="text-green-600">const user: Either&lt;Error, User&gt; = getUser()</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="w-10 h-10 bg-blue-50 text-blue-700 rounded-lg flex items-center justify-center mb-3">
                  <span>⚠️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Explicit Errors</h3>
                <p className="text-sm text-gray-600">Make error handling explicit and type-safe</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="w-10 h-10 bg-green-50 text-green-700 rounded-lg flex items-center justify-center mb-3">
                  <span>🛤️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Railway Programming</h3>
                <p className="text-sm text-gray-600">Chain operations that can fail gracefully</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-lg flex items-center justify-center mb-3">
                  <span>✅</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Type Safety</h3>
                <p className="text-sm text-gray-600">Both success and error types are compile-time safe</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-700 rounded-lg flex items-center justify-center mb-3">
                  <span>🔗</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Composable</h3>
                <p className="text-sm text-gray-600">Easy to combine and transform error-prone operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-16 bg-white rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Either in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Try/Catch Approach</h3>
              <div className="bg-red-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`function getUser(id: number): User {
  if (id <= 0) throw new Error('Invalid ID')
  const user = users.find(u => u.id === id)
  if (!user) throw new Error('Not found')
  return user
}

try {
  const user = getUser(1)
  console.log(user.name)
} catch (e) {
  console.error(e) // Untyped!
}`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Either Approach</h3>
              <div className="bg-green-50 rounded-lg p-4 font-mono text-sm">
                <pre className="text-gray-900">{`function getUser(id: number): E.Either<UserError, User> {
  if (id <= 0) return E.left('Invalid ID')
  const user = users.find(u => u.id === id)
  return user ? E.right(user) : E.left('Not found')
}

pipe(
  getUser(1),
  E.fold(
    error => console.error(error), // Typed!
    user => console.log(user.name)
  )
)`}</pre>
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
            {eitherExercises.map((exercise, index) => (
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
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Either?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold mb-2">Type-Safe Errors</h3>
              <p className="text-blue-100">Know exactly what errors can occur at compile time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🛤️</div>
              <h3 className="font-semibold mb-2">Railway Programming</h3>
              <p className="text-blue-100">Chain operations that short-circuit on errors</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-blue-100">Build robust, error-handling production code</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
