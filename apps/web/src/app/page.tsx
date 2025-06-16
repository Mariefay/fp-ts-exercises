import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            fp-ts Exercises
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Learn functional programming concepts with interactive exercises using the fp-ts library for TypeScript.
          </p>
          <div className="space-y-4">
            <Link
              href="/exercises"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Start Learning
            </Link>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Interactive exercises • Real-time feedback • Progressive learning
            </div>
          </div>
        </div>
        
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Hands-on Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Practice functional programming concepts through interactive coding exercises with immediate feedback.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Progressive Difficulty
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Start with basic concepts and gradually work your way up to advanced fp-ts patterns and techniques.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Real-world Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn through practical examples that demonstrate how to apply fp-ts in real TypeScript applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
