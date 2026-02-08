'use client'

import Link from 'next/link'
import { use } from 'react'
import { notFound } from 'next/navigation'
import { generatedExercises } from '@/data/generated-exercises'
import { moduleMetadata } from '../page'
import { moduleConcepts } from '@/data/module-concepts'
import { moduleExamples } from '@/data/module-examples'
import { moduleExplanations } from '@/data/module-explanations'

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'beginner':
      return 'bg-green-100 text-green-700 border-green-200'
    case 'intermediate':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200'
    case 'advanced':
      return 'bg-red-100 text-red-700 border-red-200'
    default:
      return 'bg-purple-100 text-purple-700 border-purple-200'
  }
}

export default function CategorySection({ params }: { params: Promise<{ category: string }> }) {
  const { category } = use(params)

  // Get metadata for this category
  const metadata = moduleMetadata[category]
  if (!metadata) {
    notFound()
  }

  // Get concepts for this category
  const concepts = moduleConcepts[category] || []

  // Get code examples for this category
  const examples = moduleExamples[category]

  // Get detailed explanation for this category
  const explanation = moduleExplanations[category]

  // Filter exercises for this category (case-insensitive match)
  const categoryExercises = generatedExercises.filter(
    ex => ex.category.toLowerCase() === category.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {metadata.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {metadata.description}
          </p>
        </div>

        {/* What is this module */}
        {concepts.length > 0 && (
          <div className="mb-16 bg-white rounded-lg p-4 sm:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              What is {metadata.title}?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-start">
              <div>
                <p className="text-gray-600 leading-relaxed mb-4 sm:mb-6 text-sm sm:text-base">
                  {explanation?.description || `${metadata.title} is a powerful functional programming pattern in fp-ts that helps you write more predictable, type-safe code.`}
                </p>
                {explanation?.inlineExample && (
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 font-mono text-xs sm:text-sm mb-4 sm:mb-6 overflow-x-auto">
                    <pre className="text-gray-900 whitespace-pre-wrap">{explanation.inlineExample}</pre>
                  </div>
                )}
                <div className="space-y-2 sm:space-y-3">
                  {metadata.topics.slice(0, 5).map((topic, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full ${metadata.bgColor.replace('bg-', 'bg-')}`}></span>
                      <span className="text-gray-700 text-xs sm:text-sm capitalize">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:gap-4">
                {concepts.map((concept, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mb-2 sm:mb-3 ${concept.color}`}>
                      <span className="text-sm sm:text-base">{concept.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{concept.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{concept.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Code Example - In Action */}
        {examples && (
          <div className="mb-16 bg-white rounded-lg p-4 sm:p-8 border border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              {metadata.title} in Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
              <div className="min-w-0">
                <h3 className="font-semibold text-red-600 mb-2 sm:mb-4 text-sm sm:text-base">{examples.traditional.title}</h3>
                <div className="bg-red-50 rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-xs md:text-sm border border-red-200 overflow-x-auto max-w-full">
                  <pre className="text-gray-900 whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">{examples.traditional.code}</pre>
                </div>
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-green-600 mb-2 sm:mb-4 text-sm sm:text-base">{examples.fpts.title}</h3>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4 font-mono text-[10px] sm:text-xs md:text-sm border border-green-200 overflow-x-auto max-w-full">
                  <pre className="text-gray-900 whitespace-pre-wrap break-words sm:whitespace-pre sm:break-normal">{examples.fpts.code}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Exercises */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Practice Exercises
          </h2>
          <div className="grid gap-4 sm:gap-6">
            {categoryExercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                        {exercise.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 line-clamp-2 sm:line-clamp-none">{exercise.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4 ml-13 sm:ml-0">
                    <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ${getDifficultyColor(exercise.difficulty)}`}>
                      {exercise.difficulty}
                    </span>
                    <Link
                      href={`/exercise/${exercise.id}`}
                      className="px-4 sm:px-6 py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-all duration-200 whitespace-nowrap"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Path - Uses module-specific colors */}
        <div className={`${metadata.bgColor} rounded-lg p-4 sm:p-8 border-2 ${metadata.borderColor}`}>
          <h2 className={`text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center ${metadata.textColor}`}>
            Why Learn {metadata.title}?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{metadata.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Master {metadata.title}</h3>
              <p className={`${metadata.textColor} text-xs sm:text-sm`}>
                Learn the fundamental concepts and patterns that make {metadata.title} powerful
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">💪</div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">{categoryExercises.length} Exercises</h3>
              <p className={`${metadata.textColor} text-xs sm:text-sm`}>
                Practice with hands-on exercises from {metadata.difficulty.toLowerCase()} level
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🚀</div>
              <h3 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Production Ready</h3>
              <p className={`${metadata.textColor} text-xs sm:text-sm`}>
                Apply {metadata.title} patterns to build robust, type-safe applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
