import Link from "next/link";

const exerciseCategories = [
  {
    id: 'option',
    name: 'Option',
    description: 'Learn about the Option type for handling nullable values safely',
    exerciseCount: 10,
    difficulty: 'Beginner',
    topics: ['some', 'none', 'fromNullable', 'fold', 'filter']
  }
];

const plannedCategories = [
  { name: 'Pipe & Flow', description: 'Function composition and data transformation', status: 'Coming Soon' },
  { name: 'Either', description: 'Error handling with Either type', status: 'Coming Soon' },
  { name: 'Task', description: 'Asynchronous operations', status: 'Coming Soon' },
  { name: 'TaskEither', description: 'Async operations with error handling', status: 'Coming Soon' },
  { name: 'ReaderTaskEither', description: 'Dependency injection patterns', status: 'Coming Soon' }
];

export default function ExercisesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Exercise Categories
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a category to start learning fp-ts concepts
          </p>
        </div>

        <div className="grid gap-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Available Now</h2>
          {exerciseCategories.map((category) => (
            <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {category.description}
                  </p>
                </div>
                <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                  {category.difficulty}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {category.topics.map((topic) => (
                  <span key={topic} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-sm">
                    {topic}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.exerciseCount} exercises
                </span>
                <Link
                  href={`/exercises/${category.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Start Exercises
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-4">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Coming Soon</h2>
          {plannedCategories.map((category, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 opacity-75">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {category.description}
                  </p>
                </div>
                <span className="bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300 px-2 py-1 rounded text-sm">
                  {category.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
