export const mockCategories = [
  {
    name: 'Array Operations',
    slug: 'array',
    description: 'Exercises for array',
    totalCount: 1
  },
  {
    name: 'Either Types',
    slug: 'either',
    description: 'Master error handling with the Either type',
    totalCount: 1
  },
  {
    name: 'Side Effects',
    slug: 'io',
    description: 'Exercises for io',
    totalCount: 1
  },
  {
    name: 'Data Manipulation',
    slug: 'optics',
    description: 'Exercises for optics',
    totalCount: 1
  },
  {
    name: 'Option Types',
    slug: 'option',
    description: 'Learn to handle optional values safely with the Option type',
    totalCount: 10
  },
  {
    name: 'Function Composition',
    slug: 'pipe',
    description: 'Function composition with pipe',
    totalCount: 1
  },
  {
    name: 'Dependency Injection',
    slug: 'reader',
    description: 'Exercises for reader',
    totalCount: 1
  },
  {
    name: 'Advanced Patterns',
    slug: 'readertaskeither',
    description: 'Exercises for readertaskeither',
    totalCount: 1
  },
  {
    name: 'String Manipulation',
    slug: 'string',
    description: 'Exercises for string',
    totalCount: 1
  }
];

export const mockExercises = {
  'option-01': {
    slug: 'option-01',
    category: 'option',
    number: '01',
    title: 'Basic Option Usage',
    description: 'Learn the fundamentals of Option types',
    difficulty: 'easy',
    tags: ['option', 'basics'],
    starterCode: `const safeHead = <A>(arr: A[]): Option<A> => {
  return none;
};`,
    solutionCode: `const safeHead = <A>(arr: A[]): Option<A> => {
  return arr.length > 0 ? some(arr[0]) : none;
};`,
    imports: [
      "import { Option, some, none } from 'fp-ts/Option';"
    ],
    conceptTitle: 'Safe Array Access with Option',
    goalStatement: 'Implement a function that safely gets the first element of an array',
    conceptExplanation: 'Option types help us handle potentially missing values without null pointer exceptions',
    hints: [
      'Check if the array has elements before accessing the first one',
      'Use some() for existing values and none for empty arrays'
    ],
    successCriteria: [
      'Function returns some(value) for non-empty arrays',
      'Function returns none for empty arrays',
      'No runtime errors occur'
    ],
    estimatedTime: 10,
    theme: 'github-light'
  },
  'either-01': {
    slug: 'either-01',
    category: 'either',
    number: '01',
    title: 'Basic Either Usage',
    description: 'Learn error handling with Either types',
    difficulty: 'medium',
    tags: ['either', 'error-handling'],
    starterCode: `const safeDivide = (a: number, b: number): Either<string, number> => {
  return left('Not implemented');
};`,
    solutionCode: `const safeDivide = (a: number, b: number): Either<string, number> => {
  return b === 0 ? left('Division by zero') : right(a / b);
};`,
    imports: [
      "import { Either, left, right } from 'fp-ts/Either';"
    ],
    conceptTitle: 'Safe Division with Either',
    goalStatement: 'Implement a function that safely divides two numbers',
    conceptExplanation: 'Either types represent computations that can fail, with Left for errors and Right for success',
    hints: [
      'Check for division by zero',
      'Use left() for errors and right() for successful results'
    ],
    successCriteria: [
      'Function returns right(result) for valid division',
      'Function returns left(error) for division by zero',
      'Error messages are descriptive'
    ],
    estimatedTime: 15,
    theme: 'github-light'
  }
};

export const mockProgress = {
  sessionId: 'test-session-123',
  completedExercises: ['option-01'],
  progressData: [
    {
      exerciseSlug: 'option-01',
      completedAt: '2024-01-01T10:00:00Z'
    }
  ]
};

export const mockProgressDashboard = {
  currentStreak: 3,
  longestStreak: 7,
  totalTimeSpent: 120,
  exercisesCompleted: 5,
  totalExercises: 20,
  weeklyProgress: [
    { date: '2024-01-01', exercisesCompleted: 2, timeSpent: 30 },
    { date: '2024-01-02', exercisesCompleted: 1, timeSpent: 20 },
    { date: '2024-01-03', exercisesCompleted: 2, timeSpent: 40 }
  ],
  categoryProgress: [
    { category: 'option', completed: 3, total: 5, percentage: 60 },
    { category: 'either', completed: 2, total: 4, percentage: 50 }
  ],
  nextRecommendedExercise: {
    slug: 'option-02',
    title: 'Advanced Option Usage',
    category: 'option',
    difficulty: 'medium'
  }
};
