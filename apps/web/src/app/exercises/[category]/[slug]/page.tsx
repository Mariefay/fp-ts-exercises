'use client';

import Link from "next/link";
import { notFound } from "next/navigation";
import { useQuery } from '@apollo/client';
import { GET_EXERCISE_BY_SLUG } from '@/lib/graphql/queries';
import { SandpackEditor } from '@/components/exercise/sandpack-editor';
import { useProgress } from '@/contexts/progress-context';
import { useEffect, useState } from 'react';

interface Exercise {
  slug: string;
  category: string;
  number: string;
  title: string;
  description: string;
  difficulty: string;
  tags: string[];
  starterCode: string;
  solutionCode: string;
  imports: string[];
}

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function ExercisePage({ params }: PageProps) {
  const { category, slug } = params;
  const { markExerciseComplete, completedExercises, isOffline } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);
  
  const exerciseSlug = `${category}-${slug.padStart(2, '0')}`;

  useEffect(() => {
    setIsCompleted(completedExercises.has(exerciseSlug));
  }, [completedExercises, exerciseSlug]);

  const { data, loading, error } = useQuery<{ getExerciseBySlug: Exercise }>(
    GET_EXERCISE_BY_SLUG,
    { variables: { slug: exerciseSlug } }
  );

  const handleTestPass = async () => {
    if (isCompleted) return;
    
    const success = await markExerciseComplete(exerciseSlug);
    if (success) {
      setIsCompleted(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading exercise...</p>
        </div>
      </div>
    );
  }

  if (error || !data?.getExerciseBySlug) {
    notFound();
  }

  const exercise = data.getExerciseBySlug;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href={`/exercises/${category}`} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            ← Back to {category} exercises
          </Link>
          <div className="flex items-center gap-4 mt-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Exercise {exercise.number}: {exercise.title}
            </h1>
            {isCompleted && (
              <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Completed
              </span>
            )}
            {isOffline && (
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                ⚠️ Offline Mode
              </span>
            )}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {exercise.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            {exercise.tags.map((tag) => (
              <span key={tag} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <SandpackEditor exercise={exercise} onTestPass={handleTestPass} />

        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
            💡 How to complete this exercise
          </h4>
          <ul className="text-blue-800 dark:text-blue-300 text-sm space-y-2">
            <li>• Edit the code in the editor above to implement the required functionality</li>
            <li>• Use the fp-ts library functions and concepts you&apos;ve learned</li>
            <li>• Click &quot;Run Tests&quot; to check your implementation</li>
            <li>• When all tests pass, the exercise will be marked as complete</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
