export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-6">🤔</div>
        <h1 className="text-3xl font-bold text-purple-800 mb-4">Exercise Not Found</h1>
        <p className="text-purple-600 mb-8">
          The exercise you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <a
          href="/sections"
          className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:scale-105 transform transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Browse All Sections
        </a>
      </div>
    </div>
  )
}
