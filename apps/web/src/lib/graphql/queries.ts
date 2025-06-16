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
  mutation MarkExerciseComplete($sessionId: String!, $exerciseSlug: String!) {
    markExerciseComplete(sessionId: $sessionId, exerciseSlug: $exerciseSlug)
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
