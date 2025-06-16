'use client';

import Link from "next/link";
import { useQuery } from '@apollo/client';
import { GET_EXERCISES_BY_CATEGORY, GET_PROGRESS } from '@/lib/graphql/queries';
import { getSessionId } from '@/lib/session';
import { useEffect, useState } from 'react';

interface Exercise {
  slug: string;
  category: string;
  number: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
}

interface CompletedExercise {
  exerciseSlug: string;
  completedAt: string;
}

interface PageProps {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: PageProps) {
  const { category } = params;
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    setSessionId(getSessionId());
  }, []);

  const { data: exercisesData, loading: exercisesLoading, error: exercisesError } = useQuery<{ getExercisesByCategory: Exercise[] }>(
    GET_EXERCISES_BY_CATEGORY,
    { variables: { category } }
  );

  const { data: progressData } = useQuery<{ getProgress: CompletedExercise[] }>(
    GET_PROGRESS,
    { 
      variables: { sessionId },
      skip: !sessionId
    }
  );

  if (exercisesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading exercises...</p>
        </div>
      </div>
    );
  }

  if (exercisesError) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️ Error loading exercises</div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{exercisesError.message}</p>
          <Link href="/exercises" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  const exercises = exercisesData?.getExercisesByCategory || [];
  const completedExercises = new Set(progressData?.getProgress?.map(p => p.exerciseSlug) || []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/exercises" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to Categories
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
            {category.charAt(0).toUpperCase() + category.slice(1)} Exercises
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Complete the exercises below to master {category} concepts
          </p>
        </div>

        <div className="grid gap-4">
          {exercises.map((exercise) => {
            const isCompleted = completedExercises.has(exercise.slug);
            
            return (
              <div key={exercise.slug} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Exercise {exercise.number}: {exercise.title}
                      </h3>
                      {isCompleted && (
                        <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded text-sm font-medium">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {exercise.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {exercise.tags.map((tag) => (
                        <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className="bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm">
                      {exercise.difficulty}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Link
                    href={`/exercises/${category}/${exercise.slug.split('-')[1]}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                  >
                    {isCompleted ? 'Review' : 'Start Exercise'}
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
