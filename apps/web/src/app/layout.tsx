import type { Metadata } from 'next';
import './globals.css';
import { ApolloProviderWrapper } from '@/components/providers/apollo-provider';
import { ProgressProvider } from '@/contexts/progress-context';
import { ErrorBoundary } from '@/components/error-boundary';

export const metadata: Metadata = {
  title: 'fp-ts Exercises',
  description:
    'Interactive learning platform for fp-ts functional programming concepts',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <ApolloProviderWrapper>
            <ProgressProvider>{children}</ProgressProvider>
          </ApolloProviderWrapper>
        </ErrorBoundary>
      </body>
    </html>
  );
}
