import Link from "next/link";
import { notFound } from "next/navigation";

const exercises = {
  option: {
    'some-and-none': { id: '01', name: 'Some and None', category: 'option' },
    'of': { id: '02', name: 'Of', category: 'option' },
    'from-predicate': { id: '03', name: 'From Predicate', category: 'option' },
    'fold': { id: '04', name: 'Fold', category: 'option' },
    'from-nullable': { id: '05', name: 'From Nullable', category: 'option' },
    'to-nullable': { id: '06', name: 'To Nullable', category: 'option' },
    'to-undefined': { id: '07', name: 'To Undefined', category: 'option' },
    'get-or-else': { id: '08', name: 'Get Or Else', category: 'option' },
    'filter': { id: '09', name: 'Filter', category: 'option' },
    'from-either': { id: '10', name: 'From Either', category: 'option' }
  }
};

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function ExercisePage({ params }: PageProps) {
  const { category, slug } = params;
  
  const categoryExercises = exercises[category as keyof typeof exercises];
  if (!categoryExercises) {
    notFound();
  }
  
  const exercise = categoryExercises[slug as keyof typeof categoryExercises];
  if (!exercise) {
    notFound();
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href={`/exercises/${category}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to {category} exercises
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            Exercise {exercise.id}: {exercise.name}
          </h1>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Interactive Exercise Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This exercise page will soon feature an interactive code editor where you can practice fp-ts concepts directly in your browser.
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              For now, use the CLI version:
            </h3>
            <div className="bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
              <div>npm run exercise -- {category} {exercise.id}</div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Run this command in your terminal from the project root to start the exercise.
            </p>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              💡 Tip
            </h4>
            <p className="text-blue-800 dark:text-blue-300 text-sm">
              The CLI version provides real-time feedback as you code. Save your changes and watch the tests run automatically!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
