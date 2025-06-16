'use client';

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '@/lib/graphql/queries';
import { useProgress } from '@/contexts/progress-context';

interface Category {
  name: string;
  slug: string;
  description: string;
  totalCount: number;
}

export default function ExercisesPage() {
  const router = useRouter();
  const { completedExercises, isOffline } = useProgress();
  const { data, loading, error } = useQuery<{ getCategories: Category[] }>(GET_CATEGORIES);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading exercise categories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error loading categories</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{error.message}</p>
          <button 
            onClick={() => {
              router.refresh();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const categories = data?.getCategories || [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Home
          </Link>
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Exercise Categories
            </h1>
            {isOffline && (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                ⚠️ Offline Mode
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Choose a category to start learning fp-ts concepts
          </p>
        </div>

        <div className="grid gap-6">
          {categories.map((category) => {
            const categoryCompletedCount = Array.from(completedExercises).filter(slug => 
              slug.startsWith(category.slug)
            ).length;
            const progressPercentage = category.totalCount > 0 ? 
              Math.round((categoryCompletedCount / category.totalCount) * 100) : 0;

            return (
              <div key={category.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {category.description}
                    </p>
                    {progressPercentage > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                          <span>Progress</span>
                          <span>{categoryCompletedCount}/{category.totalCount} ({progressPercentage}%)</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                    Available
                  </span>
                </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {category.totalCount} exercises
                </span>
                <Link
                  href={`/exercises/${category.slug}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                >
                  Start Exercises
                </Link>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
