import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getExercisesByCategory, getCategories } from '@fp-ts-exercises/exercises';
import { DifficultyBadge } from '@/components/exercise/difficulty-badge';
import { EstimatedTime } from '@/components/exercise/estimated-time';
import { CollapsibleHints } from '@/components/exercise/collapsible-hints';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  
  try {
    console.log('CategoryPage: Loading category:', category);
    const exercises = await getExercisesByCategory(category);
    console.log('CategoryPage: Exercises loaded:', exercises?.length || 0, exercises);
    const categories = await getCategories();
    console.log('CategoryPage: Categories loaded:', categories?.length || 0);
    const categoryInfo = categories.find(c => c.slug === category);
    console.log('CategoryPage: Category info:', categoryInfo);
    
    if (!categoryInfo) {
      notFound();
    }

    const getCategoryEmoji = (cat: string) => {
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
      return emojiMap[cat.toLowerCase()] || '📖';
    };

    return (
      <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 animate-fade-in">
            <Link 
              href="/exercises" 
              className="text-primary-600 hover:text-primary-700 mb-4 inline-flex items-center gap-2 font-medium transition-colors"
            >
              ← Back to all exercises
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-4xl">{getCategoryEmoji(category)}</span>
              <h1 className="text-4xl font-bold text-gray-900">{categoryInfo.name}</h1>
            </div>
            <p className="text-xl text-gray-600">{categoryInfo.description}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {exercises.map((exercise, index) => {
              const metadata = exercise.metadata || exercise;
              return (
                <div 
                  key={metadata.slug} 
                  className="bg-white rounded-lg shadow-md p-8 card-hover border border-gray-100 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <DifficultyBadge difficulty={metadata.difficulty || 'easy'} />
                        <EstimatedTime minutes={metadata.estimatedTime || 15} />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">
                        {metadata.conceptTitle || metadata.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-lg leading-relaxed">
                        {metadata.goalStatement || metadata.description}
                      </p>
                      
                      {metadata.conceptExplanation && (
                        <div className="bg-primary-50 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-primary-800 mb-2 flex items-center gap-2">
                            <span>💡</span>
                            Concept
                          </h4>
                          <p className="text-primary-700 leading-relaxed">{metadata.conceptExplanation}</p>
                        </div>
                      )}
                      
                      {metadata.hints && metadata.hints.length > 0 && (
                        <div className="mb-6">
                          <CollapsibleHints hints={metadata.hints} />
                        </div>
                      )}
                      
                      {metadata.successCriteria && metadata.successCriteria.length > 0 && (
                        <div className="bg-success-50 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-success-800 mb-3 flex items-center gap-2">
                            <span>🎯</span>
                            Success Criteria
                          </h4>
                          <ul className="text-success-700 space-y-2">
                            {metadata.successCriteria.map((criteria, idx) => (
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
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="flex gap-2 flex-wrap">
                      {(metadata.tags || []).map((tag) => (
                        <span 
                          key={tag} 
                          className="px-3 py-1 bg-accent-100 text-accent-800 text-sm rounded-full font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/exercises/${category}/${metadata.slug}`}
                      className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg transition-all duration-200 font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                      Start Exercise →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error loading category:', error);
    notFound();
  }
}
