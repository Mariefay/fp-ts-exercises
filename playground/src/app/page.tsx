'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white backdrop-blur-sm rounded-full border border-purple-200/20 text-purple-700 text-sm font-medium mb-8">
            ✨ Interactive functional programming learning
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Master fp-ts
          </h1>
          
          <p className="text-xl md:text-2xl text-purple-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            Learn functional programming in TypeScript through hands-on exercises. 
            Build confidence with <span className="text-purple-600 font-semibold">Option</span>, 
            <span className="text-blue-600 font-semibold"> Either</span>, and more.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              href="/sections"
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Learning
            </Link>
            <Link 
              href="/about"
              className="px-8 py-4 bg-white backdrop-blur-sm text-purple-700 font-semibold rounded-2xl border border-purple-200/20 hover:bg-purple-50 transition-all duration-200"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* What is fp-ts Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
            What is <span className="text-purple-600">fp-ts</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-purple-100/20 shadow-soft">
                <h3 className="text-xl font-semibold mb-4 text-purple-800">Functional Programming for TypeScript</h3>
                <p className="text-purple-600 leading-relaxed mb-6">
                  fp-ts brings the power of functional programming to TypeScript with type-safe abstractions 
                  for handling common programming patterns like error handling, nullable values, and asynchronous operations.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">Type Safety</span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">Composability</span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">Predictability</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-blue-100/20 shadow-soft">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-blue-600 text-lg">🛡️</span>
                  </div>
                  <h4 className="font-semibold text-blue-800">Type Safety</h4>
                </div>
                <p className="text-blue-600 text-sm">Catch errors at compile time, not runtime</p>
              </div>
              
              <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-green-100/20 shadow-soft">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-green-600 text-lg">🔧</span>
                  </div>
                  <h4 className="font-semibold text-green-800">Composability</h4>
                </div>
                <p className="text-green-600 text-sm">Build complex logic from simple, reusable functions</p>
              </div>
              
              <div className="bg-white backdrop-blur-sm rounded-2xl p-6 border border-yellow-100/20 shadow-soft">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-yellow-600 text-lg">✨</span>
                  </div>
                  <h4 className="font-semibold text-yellow-800">Elegance</h4>
                </div>
                <p className="text-yellow-600 text-sm">Write more expressive and maintainable code</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-800">
            Why This Playground?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-purple-100/20 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-purple-800">Interactive Learning</h3>
              <p className="text-purple-600 leading-relaxed">
                Write real code in a VS Code-like editor with instant feedback and type checking.
              </p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-blue-100/20 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-800">Guided Exercises</h3>
              <p className="text-blue-600 leading-relaxed">
                Progress through carefully crafted exercises from beginner to advanced concepts.
              </p>
            </div>
            
            <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-green-100/20 shadow-soft hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-400 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-green-800">Immediate Feedback</h3>
              <p className="text-green-600 leading-relaxed">
                Run tests instantly to see how your solutions perform and learn from mistakes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join the functional programming revolution and write better TypeScript code.
            </p>
            <Link 
              href="/sections"
              className="inline-block px-8 py-4 bg-white text-purple-600 font-semibold rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Explore Learning Sections
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
