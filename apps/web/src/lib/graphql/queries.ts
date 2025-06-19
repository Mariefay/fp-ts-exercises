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
      testCases {
        description
        code
        type
      }
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
      testCases {
        description
        code
        type
      }
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
  query GetProgress {
    getProgress
  }
`;

export const MARK_EXERCISE_COMPLETE = gql`
  mutation MarkExerciseComplete($exerciseSlug: String!) {
    markExerciseComplete(exerciseSlug: $exerciseSlug)
  }
`;

export const GET_PROGRESS_DASHBOARD = gql`
  query GetProgressDashboard {
    getProgressDashboard {
      currentStreak
      longestStreak
      totalTimeSpent
      exercisesCompleted
      totalExercises
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
  mutation TrackSessionTime($timeSpent: Int!) {
    trackSessionTime(timeSpent: $timeSpent)
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser($email: String!, $password: String!, $name: String) {
    registerUser(email: $email, password: $password, name: $name)
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password)
  }
`;

export const LOGOUT_USER = gql`
  mutation LogoutUser {
    logoutUser
  }
`;
