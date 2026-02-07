'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 rounded-full border border-blue-200 text-blue-700 text-sm font-medium mb-8">
            Interactive functional programming learning
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Master fp-ts
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn functional programming in TypeScript through hands-on exercises.
            Build confidence with Option, Either, and more.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/sections"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* What is fp-ts Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            What is <span className="text-blue-600">fp-ts</span>?
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white rounded-lg p-8 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Functional Programming for TypeScript</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  fp-ts brings the power of functional programming to TypeScript with type-safe abstractions
                  for handling common programming patterns like error handling, nullable values, and asynchronous operations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm border border-blue-200">Type Safety</span>
                  <span className="px-3 py-1 bg-green-50 text-green-700 rounded-md text-sm border border-green-200">Composability</span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-200">Predictability</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🛡️</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Type Safety</h4>
                </div>
                <p className="text-gray-600 text-sm">Catch errors at compile time, not runtime</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Composability</h4>
                </div>
                <p className="text-gray-600 text-sm">Build complex logic from simple, reusable functions</p>
              </div>

              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-2xl">✨</span>
                  </div>
                  <h4 className="font-semibold text-gray-900">Elegance</h4>
                </div>
                <p className="text-gray-600 text-sm">Write more expressive and maintainable code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Why This Playground?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Interactive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Write real code in a VS Code-like editor with instant feedback and type checking.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Guided Exercises</h3>
              <p className="text-gray-600 leading-relaxed">
                Progress through carefully crafted exercises from beginner to advanced concepts.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Immediate Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                Run tests instantly to see how your solutions perform and learn from mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-blue-600 rounded-lg p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join the functional programming revolution and write better TypeScript code.
            </p>
            <Link
              href="/sections"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Explore Learning Sections
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
