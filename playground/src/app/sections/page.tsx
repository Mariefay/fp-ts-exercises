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
						📚 28 exercises across 4 modules - Start anywhere and learn at your own pace
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
