export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About This Project
          </h1>
        </div>

        {/* About Content */}
        <div className="space-y-12">
          {/* Personal Section */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
            <div className="prose prose-lg text-gray-600">
              <p className="mb-4">
                I built this because a few years ago I had to learn fp-ts for
                work and got completely stuck. Pure functional programming was
                brand new to me, and most resources either jumped straight into
                heavy theory or didn’t give me a good way to actually practice.
                I kept wishing for a space where I could just experiment and
                learn by doing. This project is basically the tool I wish I’d
                had back then, with interactive exercises and small experiments
                so you can build intuition step by step.
              </p>
              <p className="mb-4">
                I know AI can generate a lot of this code just fine now, and in
                that sense there’s arguably less “need” to learn these concepts
                than before. But I got into programming because I genuinely
                enjoy it, and learning new ways to think about code is part of
                the fun. Functional programming stretches your brain in a good
                way, and I think there’s value in understanding what’s going on
                under the hood.
              </p>
              <p className="mb-4">
                I’m still learning this stuff myself, and the site grows as I
                do. If it helps make your fp-ts journey a little less confusing
                (and a bit more fun) than mine was, then it’s doing exactly what
                it’s meant to do.
              </p>
              <p>
                If you have feedback, questions, or just want to say hi, you can
                reach me at mariefay.tech@gmail.com — I’d genuinely love to hear
                from you.
              </p>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
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
                  <div className="font-medium text-gray-900">{tech.name}</div>
                  <div className="text-sm text-gray-600">
                    {tech.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contributions */}
          <div className="bg-white rounded-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Want to Contribute?
            </h2>
            <div className="text-gray-600 space-y-4">
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
                  href="https://github.com/Mariefay/fp-ts-exercises"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="mr-2">🐙</span>
                  View on GitHub
                </a>
                <a
                  href="mailto:mariefay.tech@gmail.com"
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <span className="mr-2">📧</span>
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
