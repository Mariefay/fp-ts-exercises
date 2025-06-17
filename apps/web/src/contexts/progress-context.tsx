'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROGRESS, CREATE_SESSION, VALIDATE_SESSION, MARK_EXERCISE_COMPLETE } from '@/lib/graphql/queries';
import { getSessionId, clearSession } from '@/lib/session';

interface CompletedExercise {
  exerciseSlug: string;
  completedAt: string;
}

interface ProgressContextType {
  sessionId: string;
  completedExercises: Set<string>;
  isLoading: boolean;
  error: string | null;
  markExerciseComplete: (exerciseSlug: string, timeSpent?: number) => Promise<boolean>;
  refreshProgress: () => void;
  isOffline: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}

interface ProgressProviderProps {
  children: React.ReactNode;
}

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [sessionId, setSessionId] = useState<string>('');
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isOffline, setIsOffline] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createSession] = useMutation(CREATE_SESSION);
  const [markCompleteMutation] = useMutation(MARK_EXERCISE_COMPLETE);

  const { data: progressData, loading: progressLoading, refetch: refetchProgress } = useQuery<{ getProgress: CompletedExercise[] }>(
    GET_PROGRESS,
    {
      variables: { sessionId },
      skip: !sessionId,
      errorPolicy: 'all',
      onError: (error) => {
        console.error('Progress query error:', error);
        setIsOffline(true);
        loadProgressFromCache();
      }
    }
  );

  const loadProgressFromCache = useCallback(() => {
    try {
      const cached = localStorage.getItem(`progress-${sessionId}`);
      if (cached) {
        const cachedProgress = JSON.parse(cached);
        setCompletedExercises(new Set(cachedProgress));
      }
    } catch (error) {
      console.error('Failed to load cached progress:', error);
    }
  }, [sessionId]);

  const saveProgressToCache = useCallback((exercises: string[]) => {
    try {
      localStorage.setItem(`progress-${sessionId}`, JSON.stringify(exercises));
    } catch (error) {
      console.error('Failed to cache progress:', error);
    }
  }, [sessionId]);

  useEffect(() => {
    const initializeSession = async () => {
      try {
        let currentSessionId = getSessionId();
        
        if (currentSessionId) {
          try {
            const response = await fetch('http://localhost:3001/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                query: `
                  query ValidateSession($sessionId: String!) {
                    validateSession(sessionId: $sessionId)
                  }
                `,
                variables: { sessionId: currentSessionId }
              })
            });
            
            const result = await response.json();
            
            if (!result.data?.validateSession) {
              clearSession();
              const { data: newSessionData } = await createSession();
              currentSessionId = newSessionData?.createSession || '';
            }
          } catch (error) {
            console.error('Session validation failed:', error);
            clearSession();
            const { data: newSessionData } = await createSession();
            currentSessionId = newSessionData?.createSession || '';
          }
        } else {
          const { data: newSessionData } = await createSession();
          currentSessionId = newSessionData?.createSession || '';
        }
        
        setSessionId(currentSessionId);
        setError(null);
        setIsOffline(false);
      } catch (error) {
        console.error('Session initialization failed:', error);
        setError('Failed to initialize session');
        setIsOffline(true);
        setSessionId(getSessionId());
      }
    };

    initializeSession();
  }, [createSession]);

  useEffect(() => {
    if (progressData?.getProgress) {
      const exerciseSlugs = progressData.getProgress.map(p => p.exerciseSlug);
      setCompletedExercises(new Set(exerciseSlugs));
      saveProgressToCache(exerciseSlugs);
      setIsOffline(false);
    }
  }, [progressData, saveProgressToCache]);

  const markExerciseComplete = useCallback(async (exerciseSlug: string, timeSpent?: number): Promise<boolean> => {
    if (!sessionId) return false;

    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      newSet.add(exerciseSlug);
      return newSet;
    });

    try {
      await markCompleteMutation({
        variables: { sessionId, exerciseSlug },
        optimisticResponse: {
          markExerciseComplete: true
        }
      });
      
      const currentExercises = Array.from(completedExercises);
      const newExercises = currentExercises.includes(exerciseSlug) 
        ? currentExercises 
        : currentExercises.concat([exerciseSlug]);
      saveProgressToCache(newExercises);
      
      return true;
    } catch (error) {
      console.error('Failed to mark exercise complete:', error);
      setCompletedExercises(prev => {
        const newSet = new Set(prev);
        newSet.delete(exerciseSlug);
        return newSet;
      });
      setIsOffline(true);
      return false;
    }
  }, [sessionId, markCompleteMutation, completedExercises, saveProgressToCache]);

  const refreshProgress = useCallback(() => {
    if (sessionId) {
      refetchProgress();
    }
  }, [sessionId, refetchProgress]);

  const value: ProgressContextType = {
    sessionId,
    completedExercises,
    isLoading: progressLoading,
    error,
    markExerciseComplete,
    refreshProgress,
    isOffline
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
