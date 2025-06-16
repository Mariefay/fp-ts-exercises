import Link from "next/link";
import { notFound } from "next/navigation";

const exercises = {
  option: [
    { id: '01', name: 'Some and None', slug: 'some-and-none', description: 'Learn the basics of Option type with some and none constructors' },
    { id: '02', name: 'Of', slug: 'of', description: 'Create Options using the of function' },
    { id: '03', name: 'From Predicate', slug: 'from-predicate', description: 'Convert predicates to Option types' },
    { id: '04', name: 'Fold', slug: 'fold', description: 'Pattern matching on Option values' },
    { id: '05', name: 'From Nullable', slug: 'from-nullable', description: 'Convert nullable values to Options' },
    { id: '06', name: 'To Nullable', slug: 'to-nullable', description: 'Convert Options back to nullable values' },
    { id: '07', name: 'To Undefined', slug: 'to-undefined', description: 'Convert Options to undefined-based values' },
    { id: '08', name: 'Get Or Else', slug: 'get-or-else', description: 'Provide default values for None cases' },
    { id: '09', name: 'Filter', slug: 'filter', description: 'Filter Option values with predicates' },
    { id: '10', name: 'From Either', slug: 'from-either', description: 'Convert Either types to Options' }
  ]
};

const categoryInfo = {
  option: {
    name: 'Option',
    description: 'The Option type represents values that might be absent. It\'s a safer alternative to null and undefined.',
    concepts: ['Type Safety', 'Null Safety', 'Functional Programming', 'Pattern Matching']
  }
};

interface PageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = params;
  
  if (!exercises[category as keyof typeof exercises]) {
    notFound();
  }
  
  const categoryExercises = exercises[category as keyof typeof exercises];
  const info = categoryInfo[category as keyof typeof categoryInfo];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/exercises" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Categories
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            {info.name} Exercises
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {info.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {info.concepts.map((concept) => (
              <span key={concept} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                {concept}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          {categoryExercises.map((exercise) => (
            <div key={exercise.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm font-mono">
                      {exercise.id}
                    </span>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exercise.name}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {exercise.description}
                  </p>
                </div>
                <Link
                  href={`/exercises/${category}/${exercise.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 ml-4"
                >
                  Start Exercise
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
