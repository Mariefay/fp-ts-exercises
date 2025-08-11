export interface Exercise {
  id: string
  title: string
  description: string
  category: string
  fileName: string
  exerciseCode: string
  solutionCode: string
  testCode: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  order: number
}

export interface TestResult {
  passed: boolean
  message: string
  error?: string
  duration?: number
}

export interface TestSuite {
  name: string
  results: TestResult[]
  passed: boolean
  total: number
  passCount: number
  failCount: number
}
