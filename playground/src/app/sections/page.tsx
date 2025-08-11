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
		status: 'Coming Soon',
	},
	{
		id: 'io',
		title: 'IO',
		description: 'Manage side effects in a functional way',
		difficulty: 'Advanced',
		exerciseCount: 12,
		color: 'from-green-400 to-emerald-400',
		bgColor: 'bg-green-50',
		borderColor: 'border-green-200',
		textColor: 'text-green-700',
		icon: '🔄',
		status: 'Coming Soon',
	},
	{
		id: 'task',
		title: 'Task',
		description: 'Asynchronous computations with error handling',
		difficulty: 'Advanced',
		exerciseCount: 10,
		color: 'from-yellow-400 to-orange-400',
		bgColor: 'bg-yellow-50',
		borderColor: 'border-yellow-200',
		textColor: 'text-yellow-700',
		icon: '⏱️',
		status: 'Coming Soon',
	},
	{
		id: 'reader',
		title: 'Reader',
		description: 'Dependency injection in a functional style',
		difficulty: 'Advanced',
		exerciseCount: 6,
		color: 'from-indigo-400 to-purple-400',
		bgColor: 'bg-indigo-50',
		borderColor: 'border-indigo-200',
		textColor: 'text-indigo-700',
		icon: '🗂️',
		status: 'Coming Soon',
	},
]

function SectionCard({ section }: { section: typeof sections[0] }) {
	const isAvailable = section.status === 'Available'

	return (
		<div
			className={`relative bg-white backdrop-blur-sm rounded-3xl p-8 border shadow-soft transition-all duration-300 ${
				isAvailable
					? 'hover:shadow-xl hover:scale-105 cursor-pointer border-purple-200/30'
					: 'border-purple-100/50 opacity-75'
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
					<h3 className="text-2xl font-bold text-purple-800 mb-2">{section.title}</h3>
					<p className="text-purple-600 leading-relaxed">{section.description}</p>
				</div>

				{/* Stats */}
				<div className="flex items-center space-x-4 text-sm text-purple-500">
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
						className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 group-hover:scale-105"
					>
						Start Learning
					</Link>
				) : (
					<div className="px-6 py-2 bg-purple-200 text-purple-400 font-medium rounded-xl cursor-not-allowed">
						Coming Soon
					</div>
				)}
			</div>
		</div>
	)
}

export default function SectionsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
			{/* Hero Section */}
			<section className="py-20 px-4">
				<div className="max-w-4xl mx-auto text-center">
					<div className="inline-flex items-center px-4 py-2 bg-white backdrop-blur-sm rounded-full border border-purple-200/20 text-purple-700 text-sm font-medium mb-8">
						📚 Learning Modules
					</div>

					<h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-8">
						Choose Your Path
					</h1>

					<p className="text-xl text-purple-600 max-w-3xl mx-auto leading-relaxed">
						Master functional programming concepts through hands-on exercises. 
						Each module builds upon the previous ones, creating a comprehensive learning journey.
					</p>
				</div>

				{/* Learning Path */}
				<div className="max-w-4xl mx-auto mt-16">
					<div className="flex flex-wrap justify-center items-center gap-4">
						{sections.slice(0, 3).map((section, index) => (
							<div key={section.id} className="flex items-center">
								<div
									className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
										index === 0
											? `bg-gradient-to-r ${section.color} text-white border-transparent`
											: 'bg-white text-purple-600 border-purple-200 opacity-60'
									}`}
								>
									{section.icon} {section.title}
								</div>
								{index < 2 && (
									<div className="mx-2 text-purple-300 text-2xl">→</div>
								)}
							</div>
						))}
					</div>
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
