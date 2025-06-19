import Link from 'next/link';
import { ProgressDashboard } from '@/components/dashboard/progress-dashboard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <main>
        <ProgressDashboard />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Link
              href="/exercises"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg transition-colors font-semibold text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-200"
            >
              Explore All Exercises →
            </Link>
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
