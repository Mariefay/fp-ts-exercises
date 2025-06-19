'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROGRESS, REGISTER_USER, LOGIN_USER, LOGOUT_USER, MARK_EXERCISE_COMPLETE } from '@/lib/graphql/queries';

interface CompletedExercise {
  exerciseSlug: string;
  completedAt: string;
}

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  completedExercises: Set<string>;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  markExerciseComplete: (exerciseSlug: string, timeSpent?: number) => Promise<boolean>;
  refreshProgress: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function useProgress() {
  return useAuth();
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const [registerMutation] = useMutation(REGISTER_USER);
  const [loginMutation] = useMutation(LOGIN_USER);
  const [logoutMutation] = useMutation(LOGOUT_USER);
  const [markCompleteMutation] = useMutation(MARK_EXERCISE_COMPLETE);

  const { data: progressData, loading: progressLoading, refetch: refetchProgress } = useQuery<{ getProgress: string[] }>(
    GET_PROGRESS,
    {
      skip: !token,
      errorPolicy: 'all',
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
      onError: (error) => {
        console.error('Progress query error:', error);
        if (error.message.includes('Unauthorized')) {
          logout();
        }
      }
    }
  );

  useEffect(() => {
    const savedToken = localStorage.getItem('auth-token');
    const savedUser = localStorage.getItem('auth-user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('auth-user');
      }
    }
  }, []);

  useEffect(() => {
    if (progressData?.getProgress) {
      const exercises = progressData.getProgress.map(p => {
        try {
          const parsed = JSON.parse(p);
          return parsed.exerciseSlug;
        } catch {
          return null;
        }
      }).filter(Boolean);
      setCompletedExercises(new Set(exercises));
    }
  }, [progressData]);

  const register = useCallback(async (email: string, password: string, name?: string): Promise<boolean> => {
    try {
      const { data } = await registerMutation({
        variables: { email, password, name },
      });
      
      if (data?.registerUser) {
        const result = JSON.parse(data.registerUser);
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('auth-token', result.token);
        localStorage.setItem('auth-user', JSON.stringify(result.user));
        setError(null);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Registration failed:', error);
      setError(error.message || 'Registration failed');
      return false;
    }
  }, [registerMutation]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });
      
      if (data?.loginUser) {
        const result = JSON.parse(data.loginUser);
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem('auth-token', result.token);
        localStorage.setItem('auth-user', JSON.stringify(result.user));
        setError(null);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Login failed:', error);
      setError(error.message || 'Login failed');
      return false;
    }
  }, [loginMutation]);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setCompletedExercises(new Set());
    localStorage.removeItem('auth-token');
    localStorage.removeItem('auth-user');
    setError(null);
    
    logoutMutation().catch(console.error);
  }, [logoutMutation]);

  const markExerciseComplete = useCallback(async (exerciseSlug: string, timeSpent?: number): Promise<boolean> => {
    if (!token) return false;

    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      newSet.add(exerciseSlug);
      return newSet;
    });

    try {
      await markCompleteMutation({
        variables: { exerciseSlug },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
        optimisticResponse: {
          markExerciseComplete: true
        }
      });
      
      return true;
    } catch (error) {
      console.error('Failed to mark exercise complete:', error);
      setCompletedExercises(prev => {
        const newSet = new Set(prev);
        newSet.delete(exerciseSlug);
        return newSet;
      });
      return false;
    }
  }, [token, markCompleteMutation]);

  const refreshProgress = useCallback(() => {
    if (token) {
      refetchProgress();
    }
  }, [token, refetchProgress]);

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    completedExercises,
    isLoading: progressLoading,
    error,
    login,
    register,
    logout,
    markExerciseComplete,
    refreshProgress,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const ProgressProvider = AuthProvider;
