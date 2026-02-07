'use client'

import React from 'react'
import Link from 'next/link'

const sections = [
	{
		id: 'option',
		title: 'Option',
		description: 'Handle nullable values safely without null/undefined errors',
		difficulty: 'Beginner Friendly',
		exerciseCount: 10,
		color: 'from-purple-400 to-pink-400',
		bgColor: 'bg-purple-50',
		borderColor: 'border-purple-200',
		textColor: 'text-purple-700',
		icon: '🛡️',
		status: 'Available',
		topics: ['Some & None', 'fromPredicate', 'fold', 'getOrElse', 'filter'],
	},
	{
		id: 'either',
		title: 'Either',
		description: 'Handle computations that might fail with explicit error handling',
		difficulty: 'Intermediate',
		exerciseCount: 8,
		color: 'from-blue-400 to-cyan-400',
		bgColor: 'bg-blue-50',
		borderColor: 'border-blue-200',
		textColor: 'text-blue-700',
		icon: '⚡',
		status: 'Available',
		topics: ['Left & Right', 'map', 'fold', 'chain', 'error handling'],
	},
	{
		id: 'pipe',
		title: 'Pipe',
		description: 'Compose functions elegantly with pipe operator',
		difficulty: 'Intermediate',
		exerciseCount: 5,
		color: 'from-green-400 to-emerald-400',
		bgColor: 'bg-green-50',
		borderColor: 'border-green-200',
		textColor: 'text-green-700',
		icon: '🔗',
		status: 'Available',
		topics: ['Basic pipe', 'Multi-step', 'With Option', 'With Either', 'Real-world'],
	},
	{
		id: 'flow',
		title: 'Flow',
		description: 'Create reusable function pipelines with flow',
		difficulty: 'Intermediate',
		exerciseCount: 5,
		color: 'from-yellow-400 to-orange-400',
		bgColor: 'bg-yellow-50',
		borderColor: 'border-yellow-200',
		textColor: 'text-yellow-700',
		icon: '🌊',
		status: 'Available',
		topics: ['Composition', 'With Option', 'With Either', 'Reusable flows'],
	},
	{
		id: 'array',
		title: 'Array',
		description: 'Master functional array operations and data transformations',
		difficulty: 'Beginner Friendly',
		exerciseCount: 10,
		color: 'from-indigo-400 to-blue-400',
		bgColor: 'bg-indigo-50',
		borderColor: 'border-indigo-200',
		textColor: 'text-indigo-700',
		icon: '📊',
		status: 'Available',
		topics: ['map', 'filter', 'reduce', 'find', 'partition', 'sort'],
	},
	{
		id: 'taskeither',
		title: 'TaskEither',
		description: 'Async operations with error handling for real-world apps',
		difficulty: 'Intermediate',
		exerciseCount: 10,
		color: 'from-teal-400 to-green-400',
		bgColor: 'bg-teal-50',
		borderColor: 'border-teal-200',
		textColor: 'text-teal-700',
		icon: '⚙️',
		status: 'Available',
		topics: ['Promises', 'Chaining', 'Parallel', 'Error recovery', 'API calls'],
	},
	{
		id: 'record',
		title: 'Record',
		description: 'Work with objects and dictionaries functionally',
		difficulty: 'Beginner Friendly',
		exerciseCount: 8,
		color: 'from-rose-400 to-pink-400',
		bgColor: 'bg-rose-50',
		borderColor: 'border-rose-200',
		textColor: 'text-rose-700',
		icon: '📝',
		status: 'Available',
		topics: ['map', 'filter', 'collect', 'lookup', 'modify', 'merge'],
	},
	{
		id: 'semigroup',
		title: 'Semigroup',
		description: 'Combine values systematically with the concat operation',
		difficulty: 'Intermediate',
		exerciseCount: 4,
		color: 'from-orange-400 to-red-400',
		bgColor: 'bg-orange-50',
		borderColor: 'border-orange-200',
		textColor: 'text-orange-700',
		icon: '🔗',
		status: 'Available',
		topics: ['concat', 'struct', 'first/last', 'combining patterns'],
	},
	{
		id: 'monoid',
		title: 'Monoid',
		description: 'Semigroup with identity - handle empty cases elegantly',
		difficulty: 'Intermediate',
		exerciseCount: 4,
		color: 'from-amber-400 to-yellow-400',
		bgColor: 'bg-amber-50',
		borderColor: 'border-amber-200',
		textColor: 'text-amber-700',
		icon: '⚪',
		status: 'Available',
		topics: ['concat + empty', 'struct', 'custom monoids', 'aggregation'],
	},
	{
		id: 'validation',
		title: 'Validation',
		description: 'Accumulate all errors instead of failing fast',
		difficulty: 'Advanced',
		exerciseCount: 7,
		color: 'from-red-400 to-pink-400',
		bgColor: 'bg-red-50',
		borderColor: 'border-red-200',
		textColor: 'text-red-700',
		icon: '✅',
		status: 'Available',
		topics: ['Error accumulation', 'Applicative', 'Form validation', 'vs Either'],
	},
	{
		id: 'nonemptyarray',
		title: 'NonEmptyArray',
		description: 'Type-safe arrays with guaranteed at least one element',
		difficulty: 'Intermediate',
		exerciseCount: 6,
		color: 'from-violet-400 to-purple-400',
		bgColor: 'bg-violet-50',
		borderColor: 'border-violet-200',
		textColor: 'text-violet-700',
		icon: '📦',
		status: 'Available',
		topics: ['head', 'tail', 'fromArray', 'sort', 'group', 'type safety'],
	},
	{
		id: 'task',
		title: 'Task',
		description: 'Lazy async computations that always succeed',
		difficulty: 'Intermediate',
		exerciseCount: 6,
		color: 'from-sky-400 to-blue-400',
		bgColor: 'bg-sky-50',
		borderColor: 'border-sky-200',
		textColor: 'text-sky-700',
		icon: '⏱️',
		status: 'Available',
		topics: ['Lazy promises', 'map', 'chain', 'parallel', 'delay'],
	},
	{
		id: 'ord',
		title: 'Ord',
		description: 'Custom ordering and comparison for any type',
		difficulty: 'Intermediate',
		exerciseCount: 6,
		color: 'from-lime-400 to-green-400',
		bgColor: 'bg-lime-50',
		borderColor: 'border-lime-200',
		textColor: 'text-lime-700',
		icon: '🔢',
		status: 'Available',
		topics: ['compare', 'contramap', 'reverse', 'min/max', 'sorting'],
	},
	{
		id: 'reader',
		title: 'Reader',
		description: 'Dependency injection without global state',
		difficulty: 'Advanced',
		exerciseCount: 8,
		color: 'from-cyan-400 to-teal-400',
		bgColor: 'bg-cyan-50',
		borderColor: 'border-cyan-200',
		textColor: 'text-cyan-700',
		icon: '🔌',
		status: 'Available',
		topics: ['ask', 'map', 'chain', 'local', 'dependency injection', 'config management'],
	},
]

function SectionCard({ section }: { section: typeof sections[0] }) {
	const isAvailable = section.status === 'Available'

	return (
		<div
			className={`relative bg-white rounded-lg p-8 border transition-all duration-300 ${
				isAvailable
					? 'hover:shadow-lg cursor-pointer border-gray-200'
					: 'border-gray-200 opacity-75'
			} group`}
		>
			{/* Status Badge */}
			<div className="absolute top-4 right-4">
				<div
					className={`px-3 py-1 rounded-full text-xs font-medium ${
						section.status === 'Available'
							? 'bg-green-100 text-green-700'
							: 'bg-purple-100 text-purple-500'
					}`}
				>
					{section.status}
				</div>
			</div>

			{/* Icon */}
			<div className="text-4xl mb-4">{section.icon}</div>

			{/* Content */}
			<div className="space-y-4">
				<div>
					<h3 className="text-2xl font-bold text-gray-900 mb-2">{section.title}</h3>
					<p className="text-gray-600 leading-relaxed">{section.description}</p>
				</div>

				{/* Stats */}
				<div className="flex items-center space-x-4 text-sm text-gray-600">
					<div className="flex items-center space-x-1">
						<span>📝</span>
						<span>{section.exerciseCount} exercises</span>
					</div>
					<div className="flex items-center space-x-1">
						<span>⭐</span>
						<span>{section.difficulty}</span>
					</div>
				</div>

				{/* CTA */}
				{isAvailable ? (
					<Link
						href={`/sections/${section.id}`}
						className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-all duration-200"
					>
						Start Learning
					</Link>
				) : (
					<div className="px-6 py-2 bg-gray-200 text-gray-400 font-medium rounded-lg cursor-not-allowed">
						Coming Soon
					</div>
				)}
			</div>
		</div>
	)
}

export default function SectionsPage() {
	return (
		<div className="min-h-screen bg-gray-50">
			{/* Hero Section */}
			<section className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center px-4 py-2 bg-white rounded-full border border-gray-200 text-gray-700 text-sm font-medium mb-8">
						📚 Learning Modules
					</div>

					<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
						Choose Your Path
					</h1>

					<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
						Master functional programming concepts through hands-on exercises.
						Each module builds upon the previous ones, creating a comprehensive learning journey.
					</p>
				</div>

				{/* Learning Path */}
				<div className="max-w-4xl mx-auto mt-16">
					<div className="flex flex-wrap justify-center items-center gap-4">
						{sections.map((section, index) => (
							<div key={section.id} className="flex items-center">
								<div
									className={`px-4 py-2 rounded-lg border ${section.borderColor} ${section.bgColor} ${section.textColor} transition-all duration-300`}
								>
									{section.icon} {section.title}
								</div>
								{index < sections.length - 1 && (
									<div className="mx-2 text-gray-300 text-2xl">→</div>
								)}
							</div>
						))}
					</div>
					<p className="text-center text-gray-600 mt-6 text-sm">
						📚 97 exercises across 14 modules - Start anywhere and learn at your own pace
					</p>
				</div>
			</section>

			{/* Sections Grid */}
			<section className="py-16 px-4">
				<div className="max-w-6xl mx-auto">
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{sections.map((section) => (
							<SectionCard key={section.id} section={section} />
						))}
					</div>
				</div>
			</section>
		</div>
	)
}
