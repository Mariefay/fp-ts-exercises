'use client';

import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

export function ApolloProviderWrapper({ children }: ApolloProviderWrapperProps) {
  return (
    <ApolloProvider client={apolloClient}>
      {children}
    </ApolloProvider>
  );
}
