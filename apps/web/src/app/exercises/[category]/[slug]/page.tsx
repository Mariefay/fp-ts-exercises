'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useQuery } from '@apollo/client';
import { GET_EXERCISE_BY_SLUG } from '@/lib/graphql/queries';
import { SandpackEditor } from '@/components/exercise/sandpack-editor';
import { DifficultyBadge } from '@/components/exercise/difficulty-badge';
import { EstimatedTime } from '@/components/exercise/estimated-time';
import { CollapsibleHints } from '@/components/exercise/collapsible-hints';
import { useProgress } from '@/contexts/progress-context';
import { useEffect, useState } from 'react';

interface TestCase {
  description: string;
  code: string;
  type: 'it' | 'describe';
}

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
  testCases: TestCase[];
  conceptTitle?: string;
  goalStatement?: string;
  conceptExplanation?: string;
  hints?: string[];
  successCriteria?: string[];
  estimatedTime?: number;
  theme?: string;
}

interface PageProps {
  params: {
    category: string;
    slug: string;
  };
}

export default function ExercisePage({ params }: PageProps) {
  const { category, slug } = params;
  const { markExerciseComplete, completedExercises } = useProgress();
  const [isCompleted, setIsCompleted] = useState(false);

  const exerciseSlug = slug;

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
          <p className="text-gray-600 dark:text-gray-300">
            Loading exercise...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data?.getExerciseBySlug) {
    notFound();
  }

  const exercise = data.getExerciseBySlug;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="mb-8">
          <Link
            href={`/exercises/${category}`}
            className="inline-flex items-center text-primary-600 hover:text-primary-800 transition-colors duration-200 mb-6"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to {category} exercises
          </Link>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8 animate-fade-in">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <DifficultyBadge
                difficulty={
                  exercise.difficulty.toLowerCase() as
                    | 'easy'
                    | 'medium'
                    | 'hard'
                }
              />
              {exercise.estimatedTime && (
                <EstimatedTime minutes={exercise.estimatedTime} />
              )}
              {isCompleted && (
                <span className="bg-success-100 text-success-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 animate-bounce-in">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Completed
                </span>
              )}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {exercise.conceptTitle || exercise.title}
            </h1>

            {exercise.goalStatement && (
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                {exercise.goalStatement}
              </p>
            )}

            {exercise.conceptExplanation && (
              <div className="bg-primary-50 rounded-lg p-6 mb-6 border-l-4 border-primary-200">
                <h3 className="font-semibold text-primary-800 mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Concept
                </h3>
                <p className="text-primary-700 leading-relaxed">
                  {exercise.conceptExplanation}
                </p>
              </div>
            )}

            {exercise.hints && exercise.hints.length > 0 && (
              <CollapsibleHints hints={exercise.hints} />
            )}

            <div className="flex flex-wrap gap-2 mt-6">
              {exercise.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-100 text-accent-800 px-3 py-1 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <SandpackEditor exercise={exercise} onTestPass={handleTestPass} />
        </div>

        {exercise.successCriteria && exercise.successCriteria.length > 0 && (
          <div className="bg-success-50 rounded-lg p-6 border-l-4 border-success-200 animate-slide-up">
            <h4 className="font-semibold text-success-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Success Criteria
            </h4>
            <ul className="text-success-700 space-y-2">
              {exercise.successCriteria.map((criteria, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-success-500 mt-1">•</span>
                  <span>{criteria}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
