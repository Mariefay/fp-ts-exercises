import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query GetCategories {
    getCategories {
      name
      slug
      description
      totalCount
    }
  }
`;

export const GET_EXERCISES_BY_CATEGORY = gql`
  query GetExercisesByCategory($category: String!) {
    getExercisesByCategory(category: $category) {
      slug
      category
      number
      title
      description
      difficulty
      tags
      starterCode
      solutionCode
      imports
      conceptTitle
      goalStatement
      conceptExplanation
      hints
      successCriteria
      estimatedTime
      theme
    }
  }
`;

export const GET_EXERCISE_BY_SLUG = gql`
  query GetExerciseBySlug($slug: String!) {
    getExerciseBySlug(slug: $slug) {
      slug
      category
      number
      title
      description
      difficulty
      tags
      starterCode
      solutionCode
      imports
      conceptTitle
      goalStatement
      conceptExplanation
      hints
      successCriteria
      estimatedTime
      theme
    }
  }
`;

export const GET_PROGRESS = gql`
  query GetProgress($sessionId: String!) {
    getProgress(sessionId: $sessionId) {
      exerciseSlug
      completedAt
    }
  }
`;

export const MARK_EXERCISE_COMPLETE = gql`
  mutation MarkExerciseComplete($sessionId: String!, $exerciseSlug: String!, $timeSpent: Int) {
    markExerciseComplete(sessionId: $sessionId, exerciseSlug: $exerciseSlug, timeSpent: $timeSpent)
  }
`;

export const GET_PROGRESS_DASHBOARD = gql`
  query GetProgressDashboard($sessionId: String!) {
    getProgressDashboard(sessionId: $sessionId) {
      currentStreak
      longestStreak
      totalTimeSpent
      exercisesCompleted
      totalExercises
      achievements {
        type
        title
        description
        unlockedAt
      }
      weeklyProgress {
        date
        exercisesCompleted
        timeSpent
      }
      categoryProgress {
        category
        completed
        total
        percentage
      }
      nextRecommendedExercise {
        slug
        title
        category
        difficulty
      }
    }
  }
`;

export const TRACK_SESSION_TIME = gql`
  mutation TrackSessionTime($sessionId: String!, $timeSpent: Int!) {
    trackSessionTime(sessionId: $sessionId, timeSpent: $timeSpent)
  }
`;

export const CREATE_SESSION = gql`
  mutation CreateSession {
    createSession
  }
`;

export const VALIDATE_SESSION = gql`
  query ValidateSession($sessionId: String!) {
    validateSession(sessionId: $sessionId)
  }
`;
