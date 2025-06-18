export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  collectCoverageFrom: [
    'src/progress/progress-dashboard.service.ts',
    'src/progress/progress-dashboard.resolver.ts',
    'src/exercise/exercise.service.ts',
    'src/exercise/exercise.resolver.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 50,
      lines: 80,
      statements: 80
    }
  }
};
