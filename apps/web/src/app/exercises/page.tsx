import Link from 'next/link';
import { getCategories } from '@fp-ts-exercises/exercises';

export default async function ExercisesPage() {
  const categories = await getCategories();

  const getCategoryEmoji = (category: string) => {
    const emojiMap: Record<string, string> = {
      option: '🎯',
      either: '🔀',
      array: '📚',
      string: '📝',
      pipe: '🔗',
      reader: '🗝️',
      io: '⚡',
      validation: '✅',
      task: '🚀',
      taskeither: '🛡️',
      readertaskeither: '🏰',
      optics: '🔍',
    };
    return emojiMap[category.toLowerCase()] || '📖';
  };

  const getCategoryTitle = (category: string) => {
    const titleMap: Record<string, string> = {
      option: 'Option Types',
      either: 'Either Types',
      array: 'Array Operations',
      string: 'String Manipulation',
      pipe: 'Function Composition',
      reader: 'Dependency Injection',
      io: 'Side Effects',
      validation: 'Input Validation',
      task: 'Async Operations',
      taskeither: 'Async Error Handling',
      readertaskeither: 'Advanced Patterns',
      optics: 'Data Manipulation',
    };
    return titleMap[category.toLowerCase()] || category;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">
            Exercise Categories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Choose a category to start learning functional programming concepts
            through engaging, hands-on exercises
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/exercises/${category.slug}`}
              className="block bg-white rounded-lg p-8 card-hover border border-gray-100 shadow-md animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-center">
                <div className="text-5xl mb-4">
                  {getCategoryEmoji(category.slug)}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">
                  {getCategoryTitle(category.slug)}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="bg-primary-100 text-primary-800 px-3 py-1 rounded-full font-medium">
                    {category.totalCount} exercise
                    {category.totalCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
