'use client'

import Link from 'next/link'
import { exercises } from '@/data/exercises'

const optionConcepts = [
  {
    title: 'Safe Null Handling',
    description: 'Never worry about null or undefined runtime errors again',
    icon: '🛡️',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    title: 'Composable Operations',
    description: 'Chain operations together without nested if-statements',
    icon: '🔗',
    color: 'bg-blue-100 text-blue-700'
  },
  {
    title: 'Type Safety',
    description: 'Compiler-enforced handling of all possible cases',
    icon: '✅',
    color: 'bg-green-100 text-green-700'
  },
  {
    title: 'Functional Style',
    description: 'Pure functions with predictable behavior',
    icon: '⚡',
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
      return 'bg-purple-100 text-purple-700 border-purple-200'
  }
}

export default function OptionSection() {
  const optionExercises = exercises.filter(ex => ex.category === 'Option')

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
            🛡️ Beginner Friendly
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            Option Type
          </h1>
          <p className="text-xl text-purple-600 max-w-3xl mx-auto leading-relaxed">
            The Option type is your first step into functional programming. It elegantly handles values that might be absent, 
            eliminating null pointer exceptions and making your code more robust.
          </p>
        </div>

        {/* What is Option */}
        <div className="mb-16 bg-white backdrop-blur-sm rounded-3xl p-8 border border-purple-100/20 shadow-soft">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">What is Option?</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-purple-600 leading-relaxed mb-6">
                Option is a container that holds either a value (Some) or nothing (None). Instead of using 
                null or undefined, which can cause runtime errors, Option forces you to explicitly handle 
                both cases at compile time.
              </p>
              <div className="bg-purple-50 rounded-xl p-4 font-mono text-sm">
                <div className="text-purple-500 mb-2">{`// Instead of this:`}</div>
                <div className="text-red-600 mb-4">{`const user = getUser() // might be null!`}</div>
                <div className="text-purple-500 mb-2">{`// Use this:`}</div>
                <div className="text-green-600">const user: Option&lt;User&gt; = getUser()</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {optionConcepts.map((concept, index) => (
                <div key={index} className="bg-white/15 rounded-2xl p-4 border border-purple-100/20 shadow-sm">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${concept.color}`}>
                    <span>{concept.icon}</span>
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">{concept.title}</h3>
                  <p className="text-sm text-purple-600">{concept.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mb-16 bg-white backdrop-blur-sm rounded-3xl p-8 border border-blue-100/20 shadow-soft">
          <h2 className="text-2xl font-bold text-purple-800 mb-6">Option in Action</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-red-600 mb-4">❌ Traditional Approach</h3>
              <div className="bg-red-50 rounded-xl p-4 font-mono text-sm">
                <pre className="text-purple-800">{`function getUser(id: number): User | null {
  return users.find(u => u.id === id) ?? null
}

const user = getUser(1)
if (user !== null) {
  console.log(user.name) // Might still crash!
} else {
  console.log('User not found')
}`}</pre>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-green-600 mb-4">✅ Option Approach</h3>
              <div className="bg-green-50 rounded-xl p-4 font-mono text-sm">
                <pre className="text-purple-800">{`function getUser(id: number): Option<User> {
  const user = users.find(u => u.id === id)
  return user ? O.some(user) : O.none
}

const result = pipe(
  getUser(1),
  O.fold(
    () => 'User not found',
    user => user.name
  )
) // Type safe and elegant!`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Exercises */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-purple-800 mb-8 text-center">
            Practice Exercises
          </h2>
          <div className="grid gap-6">
            {optionExercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-purple-100/20 shadow-soft hover:shadow-lg transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-purple-800 group-hover:text-purple-600 transition-colors">
                        {exercise.title}
                      </h3>
                      <p className="text-purple-600">{exercise.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <Link 
                      href={`/exercise/${exercise.id}`}
                      className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
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
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Learn Option?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🚫</div>
              <h3 className="font-semibold mb-2">No More Null Crashes</h3>
              <p className="text-purple-100">Eliminate null pointer exceptions at compile time</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">🔧</div>
              <h3 className="font-semibold mb-2">Better API Design</h3>
              <p className="text-purple-100">APIs that clearly express what might be missing</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Functional Foundation</h3>
              <p className="text-purple-100">Building blocks for more advanced fp-ts concepts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
