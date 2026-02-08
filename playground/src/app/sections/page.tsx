'use client'

import React from 'react'
import Link from 'next/link'
import { generatedExercises } from '@/data/generated-exercises'

// Module metadata - colors, icons, descriptions
// Exported for use in dynamic [category] route
export const moduleMetadata: Record<string, {
	title: string
	description: string
	difficulty: string
	icon: string
	color: string
	bgColor: string
	borderColor: string
	textColor: string
	topics: string[]
	path: string
}> = {
	option: {
		title: 'Option',
		description: 'Handle nullable values safely without null/undefined errors',
		difficulty: 'Beginner Friendly',
		icon: '🛡️',
		color: 'from-purple-400 to-pink-400',
		bgColor: 'bg-purple-50',
		borderColor: 'border-purple-200',
		textColor: 'text-purple-700',
		topics: ['Some & None', 'fromPredicate', 'fold', 'getOrElse', 'filter'],
		path: 'foundations',
	},
	either: {
		title: 'Either',
		description: 'Handle computations that might fail with explicit error handling',
		difficulty: 'Beginner Friendly',
		icon: '⚡',
		color: 'from-blue-400 to-cyan-400',
		bgColor: 'bg-blue-50',
		borderColor: 'border-blue-200',
		textColor: 'text-blue-700',
		topics: ['Left & Right', 'map', 'fold', 'chain', 'error handling'],
		path: 'foundations',
	},
	pipe: {
		title: 'Pipe',
		description: 'Compose functions elegantly with pipe operator',
		difficulty: 'Beginner Friendly',
		icon: '🔗',
		color: 'from-green-400 to-emerald-400',
		bgColor: 'bg-green-50',
		borderColor: 'border-green-200',
		textColor: 'text-green-700',
		topics: ['Basic pipe', 'Multi-step', 'With Option', 'With Either', 'Real-world'],
		path: 'foundations',
	},
	flow: {
		title: 'Flow',
		description: 'Create reusable function pipelines with flow',
		difficulty: 'Beginner Friendly',
		icon: '🌊',
		color: 'from-yellow-400 to-orange-400',
		bgColor: 'bg-yellow-50',
		borderColor: 'border-yellow-200',
		textColor: 'text-yellow-700',
		topics: ['Composition', 'With Option', 'With Either', 'Reusable flows'],
		path: 'foundations',
	},
	array: {
		title: 'Array',
		description: 'Master functional array operations and data transformations',
		difficulty: 'Beginner Friendly',
		icon: '📊',
		color: 'from-indigo-400 to-blue-400',
		bgColor: 'bg-indigo-50',
		borderColor: 'border-indigo-200',
		textColor: 'text-indigo-700',
		topics: ['map', 'filter', 'reduce', 'find', 'partition', 'sort'],
		path: 'data',
	},
	taskeither: {
		title: 'TaskEither',
		description: 'Async operations with error handling for real-world apps',
		difficulty: 'Intermediate',
		icon: '⚙️',
		color: 'from-teal-400 to-green-400',
		bgColor: 'bg-teal-50',
		borderColor: 'border-teal-200',
		textColor: 'text-teal-700',
		topics: ['Promises', 'Chaining', 'Parallel', 'Error recovery', 'API calls'],
		path: 'async',
	},
	record: {
		title: 'Record',
		description: 'Work with objects and dictionaries functionally',
		difficulty: 'Beginner Friendly',
		icon: '📝',
		color: 'from-rose-400 to-pink-400',
		bgColor: 'bg-rose-50',
		borderColor: 'border-rose-200',
		textColor: 'text-rose-700',
		topics: ['map', 'filter', 'collect', 'lookup', 'modify', 'merge'],
		path: 'data',
	},
	semigroup: {
		title: 'Semigroup',
		description: 'Combine values systematically with the concat operation',
		difficulty: 'Intermediate',
		icon: '🔗',
		color: 'from-orange-400 to-red-400',
		bgColor: 'bg-orange-50',
		borderColor: 'border-orange-200',
		textColor: 'text-orange-700',
		topics: ['concat', 'struct', 'first/last', 'combining patterns'],
		path: 'typeclasses',
	},
	monoid: {
		title: 'Monoid',
		description: 'Semigroup with identity - handle empty cases elegantly',
		difficulty: 'Intermediate',
		icon: '⚪',
		color: 'from-amber-400 to-yellow-400',
		bgColor: 'bg-amber-50',
		borderColor: 'border-amber-200',
		textColor: 'text-amber-700',
		topics: ['concat + empty', 'struct', 'custom monoids', 'aggregation'],
		path: 'typeclasses',
	},
	validation: {
		title: 'Validation',
		description: 'Accumulate all errors instead of failing fast',
		difficulty: 'Intermediate',
		icon: '✅',
		color: 'from-red-400 to-pink-400',
		bgColor: 'bg-red-50',
		borderColor: 'border-red-200',
		textColor: 'text-red-700',
		topics: ['Error accumulation', 'Applicative', 'Form validation', 'vs Either'],
		path: 'typeclasses',
	},
	nonemptyarray: {
		title: 'NonEmptyArray',
		description: 'Type-safe arrays with guaranteed at least one element',
		difficulty: 'Intermediate',
		icon: '📦',
		color: 'from-violet-400 to-purple-400',
		bgColor: 'bg-violet-50',
		borderColor: 'border-violet-200',
		textColor: 'text-violet-700',
		topics: ['head', 'tail', 'fromArray', 'sort', 'group', 'type safety'],
		path: 'data',
	},
	task: {
		title: 'Task',
		description: 'Lazy async computations that always succeed',
		difficulty: 'Intermediate',
		icon: '⏱️',
		color: 'from-sky-400 to-blue-400',
		bgColor: 'bg-sky-50',
		borderColor: 'border-sky-200',
		textColor: 'text-sky-700',
		topics: ['Lazy promises', 'map', 'chain', 'parallel', 'delay'],
		path: 'async',
	},
	ord: {
		title: 'Ord',
		description: 'Custom ordering and comparison for any type',
		difficulty: 'Intermediate',
		icon: '🔢',
		color: 'from-lime-400 to-green-400',
		bgColor: 'bg-lime-50',
		borderColor: 'border-lime-200',
		textColor: 'text-lime-700',
		topics: ['compare', 'contramap', 'reverse', 'min/max', 'sorting'],
		path: 'typeclasses',
	},
	reader: {
		title: 'Reader',
		description: 'Dependency injection without global state',
		difficulty: 'Advanced',
		icon: '🔌',
		color: 'from-cyan-400 to-teal-400',
		bgColor: 'bg-cyan-50',
		borderColor: 'border-cyan-200',
		textColor: 'text-cyan-700',
		topics: ['ask', 'map', 'chain', 'local', 'dependency injection', 'config management'],
		path: 'advanced',
	},
	readertaskeither: {
		title: 'ReaderTaskEither',
		description: 'The ultimate composition: DI + async + error handling',
		difficulty: 'Advanced',
		icon: '🎯',
		color: 'from-purple-400 to-indigo-400',
		bgColor: 'bg-purple-50',
		borderColor: 'border-purple-200',
		textColor: 'text-purple-700',
		topics: ['ask', 'flatMap', 'mapLeft', 'local', 'parallel', 'real-world patterns'],
		path: 'advanced',
	},
	io: {
		title: 'IO/IOEither',
		description: 'Synchronous side effects with type safety',
		difficulty: 'Advanced',
		icon: '💾',
		color: 'from-emerald-400 to-teal-400',
		bgColor: 'bg-emerald-50',
		borderColor: 'border-emerald-200',
		textColor: 'text-emerald-700',
		topics: ['lazy computation', 'tryCatch', 'chain', 'fromIO', 'config loading'],
		path: 'advanced',
	},
	these: {
		title: 'These',
		description: 'Inclusive-or: represent "this", "that", or "both"',
		difficulty: 'Advanced',
		icon: '⚖️',
		color: 'from-fuchsia-400 to-pink-400',
		bgColor: 'bg-fuchsia-50',
		borderColor: 'border-fuchsia-200',
		textColor: 'text-fuchsia-700',
		topics: ['fold', 'map/bimap', 'Semigroup', 'validation with warnings'],
		path: 'advanced',
	},
}

interface Section {
	id: string
	title: string
	description: string
	difficulty: string
	exerciseCount: number
	color: string
	bgColor: string
	borderColor: string
	textColor: string
	icon: string
	status: string
	topics: string[]
	path: string
}

function generateSectionsFromExercises(): Section[] {
	// Group exercises by category
	const exercisesByCategory = generatedExercises.reduce((acc, exercise) => {
		const category = exercise.category.toLowerCase()
		if (!acc[category]) {
			acc[category] = []
		}
		acc[category].push(exercise)
		return acc
	}, {} as Record<string, typeof generatedExercises>)

	// Convert to sections array
	return Object.entries(exercisesByCategory).map(([category, exercises]) => {
		const metadata = moduleMetadata[category] || {
			title: category.charAt(0).toUpperCase() + category.slice(1),
			description: `Learn ${category} in fp-ts`,
			difficulty: 'Intermediate',
			icon: '📚',
			color: 'from-gray-400 to-gray-500',
			bgColor: 'bg-gray-50',
			borderColor: 'border-gray-200',
			textColor: 'text-gray-700',
			topics: ['Core concepts', 'Practical examples'],
			path: 'other',
		}

		return {
			id: category,
			exerciseCount: exercises.length,
			status: 'Available',
			...metadata,
		}
	})
}

const sections = generateSectionsFromExercises()

function SectionCard({ section }: { section: typeof sections[0] }) {
	const isAvailable = section.status === 'Available'

	return (
		<div
			className={`relative bg-white rounded-lg p-4 sm:p-6 md:p-8 border transition-all duration-300 flex flex-col h-full ${
				isAvailable
					? 'hover:shadow-lg cursor-pointer border-gray-200'
					: 'border-gray-200 opacity-75'
			} group`}
		>
			{/* Status Badge */}
			<div className="absolute top-3 right-3 sm:top-4 sm:right-4">
				<div
					className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${
						section.status === 'Available'
							? 'bg-green-100 text-green-700'
							: 'bg-purple-100 text-purple-500'
					}`}
				>
					{section.status}
				</div>
			</div>

			{/* Icon */}
			<div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{section.icon}</div>

			{/* Content - grows to fill available space */}
			<div className="flex flex-col flex-1">
				<div className="flex-1">
					<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">{section.title}</h3>
					<p className="text-sm sm:text-base text-gray-600 leading-relaxed">{section.description}</p>
				</div>

				{/* Stats */}
				<div className="flex items-center flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4">
					<div className="flex items-center space-x-1">
						<span>📝</span>
						<span>{section.exerciseCount} exercises</span>
					</div>
					<div className="flex items-center space-x-1">
						<span>⭐</span>
						<span>{section.difficulty}</span>
					</div>
				</div>

				{/* CTA - always at bottom */}
				<div className="mt-4 sm:mt-6">
					{isAvailable ? (
						<Link
							href={`/sections/${section.id}`}
							className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
						>
							Start Learning
						</Link>
					) : (
						<div className="inline-block px-4 sm:px-6 py-2 bg-gray-200 text-gray-400 text-sm sm:text-base font-medium rounded-lg cursor-not-allowed">
							Coming Soon
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default function SectionsPage() {
	// Calculate stats
	const totalExercises = generatedExercises.length
	const totalModules = sections.length

	// Group sections by learning path
	const foundationsSections = sections.filter(s => s.path === 'foundations')
	const dataSections = sections.filter(s => s.path === 'data')
	const typeclassesSections = sections.filter(s => s.path === 'typeclasses')
	const asyncSections = sections.filter(s => s.path === 'async')
	const advancedSections = sections.filter(s => s.path === 'advanced')

	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 text-sm font-medium mb-8">
						📚 {totalModules} Learning Modules · {totalExercises} Exercises
					</div>

					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
						Choose Your Learning Path
					</h1>

					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Master functional programming through topic-based learning paths.
						Start with foundations, build on data structures, learn type classes, and progress to advanced patterns.
					</p>
				</div>

				{/* Learning Paths Overview */}
				<div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
					<div className="bg-white rounded-lg p-6 border border-gray-200">
						<div className="text-3xl mb-3">🎯</div>
						<h3 className="font-bold text-lg text-gray-900 mb-2">Start with Foundations</h3>
						<p className="text-gray-600 text-sm">Learn composition (Pipe/Flow) and error handling (Option/Either)</p>
					</div>
					<div className="bg-white rounded-lg p-6 border border-gray-200">
						<div className="text-3xl mb-3">📊</div>
						<h3 className="font-bold text-lg text-gray-900 mb-2">Master Data & Type Classes</h3>
						<p className="text-gray-600 text-sm">Work with collections and algebraic structures</p>
					</div>
					<div className="bg-white rounded-lg p-6 border border-gray-200">
						<div className="text-3xl mb-3">🚀</div>
						<h3 className="font-bold text-lg text-gray-900 mb-2">Apply to Real-World</h3>
						<p className="text-gray-600 text-sm">Async operations and production patterns</p>
					</div>
				</div>
			</section>

			{/* Sections Grid - Grouped by Learning Path */}
			<section className="py-16 px-4">
				<div className="max-w-7xl mx-auto space-y-16">
					{/* 🎯 Core Foundations */}
					{foundationsSections.length > 0 && (
						<div>
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Core Foundations</h2>
								<p className="text-gray-600">
									Start here! Learn function composition and error handling - the building blocks of fp-ts.
								</p>
								<div className="flex items-center gap-2 mt-3">
									<span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
										{foundationsSections.length} modules
									</span>
									<span className="text-gray-400">→</span>
									<span className="text-sm text-gray-600">Pipe → Flow → Option → Either</span>
								</div>
							</div>
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								{foundationsSections.map((section) => (
									<SectionCard key={section.id} section={section} />
								))}
							</div>
						</div>
					)}

					{/* 📊 Working with Data */}
					{dataSections.length > 0 && (
						<div>
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Working with Data</h2>
								<p className="text-gray-600">
									Apply functional patterns to collections and objects.
								</p>
								<div className="flex items-center gap-2 mt-3">
									<span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
										{dataSections.length} modules
									</span>
									<span className="text-gray-400">→</span>
									<span className="text-sm text-gray-600">Build on foundations with real data structures</span>
								</div>
							</div>
							<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
								{dataSections.map((section) => (
									<SectionCard key={section.id} section={section} />
								))}
							</div>
						</div>
					)}

					{/* 🧮 Type Classes */}
					{typeclassesSections.length > 0 && (
						<div>
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-2">🧮 Type Classes</h2>
								<p className="text-gray-600">
									Learn algebraic structures for combining, ordering, and validating data.
								</p>
								<div className="flex items-center gap-2 mt-3">
									<span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
										{typeclassesSections.length} modules
									</span>
									<span className="text-gray-400">→</span>
									<span className="text-sm text-gray-600">Semigroup → Monoid → Validation</span>
								</div>
							</div>
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								{typeclassesSections.map((section) => (
									<SectionCard key={section.id} section={section} />
								))}
							</div>
						</div>
					)}

					{/* ⚡ Async Operations */}
					{asyncSections.length > 0 && (
						<div>
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-2">⚡ Async Operations</h2>
								<p className="text-gray-600">
									Handle asynchronous work with type-safe error handling.
								</p>
								<div className="flex items-center gap-2 mt-3">
									<span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
										{asyncSections.length} modules
									</span>
									<span className="text-gray-400">→</span>
									<span className="text-sm text-gray-600">Essential for API calls and real-world apps</span>
								</div>
							</div>
							<div className="grid md:grid-cols-2 gap-6">
								{asyncSections.map((section) => (
									<SectionCard key={section.id} section={section} />
								))}
							</div>
						</div>
					)}

					{/* 🚀 Advanced Patterns */}
					{advancedSections.length > 0 && (
						<div>
							<div className="mb-8">
								<h2 className="text-3xl font-bold text-gray-900 mb-2">🚀 Advanced Patterns</h2>
								<p className="text-gray-600">
									Production-ready patterns for dependency injection, side effects, and complex scenarios.
								</p>
								<div className="flex items-center gap-2 mt-3">
									<span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
										{advancedSections.length} modules
									</span>
									<span className="text-gray-400">→</span>
									<span className="text-sm text-gray-600">Put everything together</span>
								</div>
							</div>
							<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
								{advancedSections.map((section) => (
									<SectionCard key={section.id} section={section} />
								))}
							</div>
						</div>
					)}
				</div>
			</section>
		</div>
	)
}
