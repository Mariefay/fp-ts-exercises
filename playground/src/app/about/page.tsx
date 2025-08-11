export default function About() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6">
            About This Project
          </h1>
          <p className="text-xl text-purple-600 leading-relaxed">
            Hi! I&apos;m passionate about functional programming and making it
            accessible to everyone.
          </p>
        </div>

        {/* About Content */}
        <div className="space-y-12">
          {/* Personal Section */}
          <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-purple-100/20 shadow-soft">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              About Me
            </h2>
            <div className="prose prose-lg text-purple-600">
              <p className="mb-4">
                I&apos;m a developer who fell in love with functional
                programming and its ability to make code more predictable,
                testable, and maintainable. After years of working with fp-ts, I
                wanted to create a better way for developers to learn these
                powerful concepts.
              </p>
              <p className="mb-4">
                Traditional tutorials often jump straight into complex theory,
                but I believe in learning by doing. This interactive playground
                lets you experiment with code, see immediate results, and build
                confidence step by step.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring new
                programming languages, contributing to open source projects, or
                teaching others about the beauty of functional programming.
              </p>
            </div>
          </div>

          {/* Project Motivation */}
          <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-blue-100/20 shadow-soft">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              Why This Playground?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-purple-700 mb-3">
                  The Problem
                </h3>
                <ul className="space-y-2 text-purple-600">
                  <li>
                    • fp-ts documentation can be overwhelming for beginners
                  </li>
                  <li>• Complex type signatures scare away newcomers</li>
                  <li>• No interactive way to practice concepts</li>
                  <li>• Hard to see the practical benefits immediately</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-3">
                  The Solution
                </h3>
                <ul className="space-y-2 text-purple-600">
                  <li>• Hands-on exercises with real code</li>
                  <li>• Immediate feedback and error messages</li>
                  <li>• Progressive difficulty levels</li>
                  <li>• Practical examples you can relate to</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-green-100/20 shadow-soft">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              Built With
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Next.js', icon: '⚛️', description: 'React framework' },
                { name: 'TypeScript', icon: '📘', description: 'Type safety' },
                {
                  name: 'Monaco Editor',
                  icon: '💻',
                  description: 'VS Code editor',
                },
                { name: 'Tailwind CSS', icon: '🎨', description: 'Styling' },
                {
                  name: 'fp-ts',
                  icon: '🔗',
                  description: 'Functional library',
                },
                {
                  name: 'Vitest',
                  icon: '🧪',
                  description: 'Testing framework',
                },
                { name: 'Vercel', icon: '▲', description: 'Deployment' },
                {
                  name: 'Open Source',
                  icon: '❤️',
                  description: 'Community driven',
                },
              ].map(tech => (
                <div key={tech.name} className="text-center">
                  <div className="text-2xl mb-2">{tech.icon}</div>
                  <div className="font-medium text-purple-800">{tech.name}</div>
                  <div className="text-sm text-purple-600">
                    {tech.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contributions */}
          <div className="bg-white backdrop-blur-sm rounded-3xl p-8 border border-yellow-100/20 shadow-soft">
            <h2 className="text-2xl font-bold text-purple-800 mb-6">
              Want to Contribute?
            </h2>
            <div className="text-purple-600 space-y-4">
              <p>
                This project is open source and welcomes contributions! Whether
                you want to:
              </p>
              <ul className="space-y-2 ml-6 list-disc">
                <li>Add new exercises or improve existing ones</li>
                <li>Fix bugs or enhance the user interface</li>
                <li>Improve documentation or add translations</li>
                <li>Share feedback and suggestions</li>
              </ul>
              <p>
                Every contribution helps make functional programming more
                accessible to developers worldwide.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://github.com"
                  className="inline-flex items-center px-4 py-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">🐙</span>
                  View on GitHub
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors"
                >
                  <span className="mr-2">📧</span>
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          {/* Learning Philosophy */}
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Learning Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-semibold mb-2">Practice Over Theory</h3>
                <p className="text-purple-100">
                  Learn by writing real code, not just reading about it
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">🚀</div>
                <h3 className="font-semibold mb-2">Progressive Learning</h3>
                <p className="text-purple-100">
                  Start simple, build complexity step by step
                </p>
              </div>
              <div>
                <div className="text-3xl mb-3">✨</div>
                <h3 className="font-semibold mb-2">Immediate Feedback</h3>
                <p className="text-purple-100">
                  See results instantly and learn from mistakes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
