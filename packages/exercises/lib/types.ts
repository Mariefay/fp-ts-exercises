export interface ExerciseMetadata {
  slug: string;
  category: string;
  number: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  conceptTitle?: string;
  goalStatement?: string;
  conceptExplanation?: string;
  hints?: string[];
  successCriteria?: string[];
  estimatedTime?: number;
  theme?: string;
}

export interface Exercise {
  metadata: ExerciseMetadata;
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
  imports: string[];
  slug: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  conceptTitle?: string;
  goalStatement?: string;
  conceptExplanation?: string;
  hints?: string[];
  successCriteria?: string[];
  estimatedTime?: number;
}

export interface TestCase {
  description: string;
  code: string;
  type: 'it' | 'describe';
}

export interface ExerciseCategory {
  name: string;
  slug: string;
  description: string;
  exercises: ExerciseMetadata[];
  totalCount: number;
}

export interface ExerciseCatalog {
  categories: ExerciseCategory[];
  exercises: Exercise[];
  totalCount: number;
}
