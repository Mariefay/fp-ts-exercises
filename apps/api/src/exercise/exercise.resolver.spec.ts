import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseResolver } from './exercise.resolver.js';
import { ExerciseService } from './exercise.service.js';
import { DifficultyLevel } from './exercise.types.js';

describe('ExerciseResolver', () => {
  let resolver: ExerciseResolver;
  let exerciseService: jest.Mocked<ExerciseService>;

  const mockExerciseData = {
    metadata: {
      slug: 'option/01',
      category: 'option',
      number: '01',
      title: 'Basic Option Handling',
      description: 'Learn the basics of Option type',
      difficulty: 'easy',
      tags: ['option', 'basic'],
      conceptTitle: 'Option Fundamentals',
      goalStatement: 'Understand Option type',
      conceptExplanation: 'Option represents optional values',
      hints: ['Use map for transformations', 'Use getOrElse for defaults'],
      successCriteria: ['All tests pass', 'Code compiles'],
      estimatedTime: 15,
      theme: 'functional-programming'
    },
    starterCode: 'const result = ',
    solutionCode: 'const result = some(42)',
    imports: ['import { some, none } from "fp-ts/Option"']
  };

  const mockExercises = [mockExerciseData];

  const mockCategories = [
    { name: 'Option', slug: 'option', description: 'Option exercises', totalCount: 10 },
    { name: 'Either', slug: 'either', description: 'Either exercises', totalCount: 8 }
  ];

  beforeEach(async () => {
    const mockExerciseService = {
      getExercises: jest.fn(),
      getExerciseBySlug: jest.fn(),
      getExercisesByCategory: jest.fn(),
      getCategories: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseResolver,
        { provide: ExerciseService, useValue: mockExerciseService }
      ],
    }).compile();

    resolver = module.get<ExerciseResolver>(ExerciseResolver);
    exerciseService = module.get(ExerciseService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getExercises', () => {
    it('should return mapped exercises', async () => {
      exerciseService.getExercises.mockResolvedValue(mockExercises);

      const result = await resolver.getExercises();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        slug: 'option/01',
        category: 'option',
        number: '01',
        title: 'Basic Option Handling',
        description: 'Learn the basics of Option type',
        difficulty: 'easy',
        tags: ['option', 'basic'],
        starterCode: 'const result = ',
        solutionCode: 'const result = some(42)',
        imports: ['import { some, none } from "fp-ts/Option"'],
        conceptTitle: 'Option Fundamentals',
        goalStatement: 'Understand Option type',
        conceptExplanation: 'Option represents optional values',
        hints: ['Use map for transformations', 'Use getOrElse for defaults'],
        successCriteria: ['All tests pass', 'Code compiles'],
        estimatedTime: 15,
        theme: 'functional-programming'
      });
      expect(exerciseService.getExercises).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no exercises found', async () => {
      exerciseService.getExercises.mockResolvedValue([]);

      const result = await resolver.getExercises();

      expect(result).toEqual([]);
      expect(exerciseService.getExercises).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      exerciseService.getExercises.mockRejectedValue(new Error('Service error'));

      await expect(resolver.getExercises()).rejects.toThrow('Service error');
    });

    it('should handle exercises with missing optional fields', async () => {
      const exerciseWithMissingFields = {
        metadata: {
          slug: 'option/02',
          category: 'option',
          number: '02',
          title: 'Basic Option',
          description: 'Basic exercise',
          tags: []
        },
        starterCode: '',
        solutionCode: '',
        imports: []
      };
      exerciseService.getExercises.mockResolvedValue([exerciseWithMissingFields]);

      const result = await resolver.getExercises();

      expect(result[0].difficulty).toBe('easy');
      expect(result[0].conceptTitle).toBeUndefined();
      expect(result[0].hints).toBeUndefined();
    });
  });

  describe('getExerciseBySlug', () => {
    it('should return mapped exercise for valid slug', async () => {
      exerciseService.getExerciseBySlug.mockResolvedValue(mockExerciseData);

      const result = await resolver.getExerciseBySlug('option/01');

      expect(result).toEqual({
        slug: 'option/01',
        category: 'option',
        number: '01',
        title: 'Basic Option Handling',
        description: 'Learn the basics of Option type',
        difficulty: 'easy',
        tags: ['option', 'basic'],
        starterCode: 'const result = ',
        solutionCode: 'const result = some(42)',
        imports: ['import { some, none } from "fp-ts/Option"'],
        conceptTitle: 'Option Fundamentals',
        goalStatement: 'Understand Option type',
        conceptExplanation: 'Option represents optional values',
        hints: ['Use map for transformations', 'Use getOrElse for defaults'],
        successCriteria: ['All tests pass', 'Code compiles'],
        estimatedTime: 15,
        theme: 'functional-programming'
      });
      expect(exerciseService.getExerciseBySlug).toHaveBeenCalledWith('option/01');
    });

    it('should return null for non-existent slug', async () => {
      exerciseService.getExerciseBySlug.mockResolvedValue(null);

      const result = await resolver.getExerciseBySlug('non-existent');

      expect(result).toBeNull();
      expect(exerciseService.getExerciseBySlug).toHaveBeenCalledWith('non-existent');
    });

    it('should handle empty slug', async () => {
      exerciseService.getExerciseBySlug.mockResolvedValue(null);

      const result = await resolver.getExerciseBySlug('');

      expect(result).toBeNull();
      expect(exerciseService.getExerciseBySlug).toHaveBeenCalledWith('');
    });

    it('should handle service errors', async () => {
      exerciseService.getExerciseBySlug.mockRejectedValue(new Error('Service error'));

      await expect(resolver.getExerciseBySlug('option/01')).rejects.toThrow('Service error');
    });
  });

  describe('getExercisesByCategory', () => {
    it('should return mapped exercises for valid category', async () => {
      exerciseService.getExercisesByCategory.mockResolvedValue(mockExercises);

      const result = await resolver.getExercisesByCategory('option');

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe('option');
      expect(exerciseService.getExercisesByCategory).toHaveBeenCalledWith('option');
    });

    it('should return empty array for non-existent category', async () => {
      exerciseService.getExercisesByCategory.mockResolvedValue([]);

      const result = await resolver.getExercisesByCategory('non-existent');

      expect(result).toEqual([]);
      expect(exerciseService.getExercisesByCategory).toHaveBeenCalledWith('non-existent');
    });

    it('should handle empty category', async () => {
      exerciseService.getExercisesByCategory.mockResolvedValue([]);

      const result = await resolver.getExercisesByCategory('');

      expect(result).toEqual([]);
      expect(exerciseService.getExercisesByCategory).toHaveBeenCalledWith('');
    });

    it('should handle service errors', async () => {
      exerciseService.getExercisesByCategory.mockRejectedValue(new Error('Service error'));

      await expect(resolver.getExercisesByCategory('option')).rejects.toThrow('Service error');
    });
  });

  describe('getCategories', () => {
    it('should return mapped categories', async () => {
      exerciseService.getCategories.mockResolvedValue(mockCategories);

      const result = await resolver.getCategories();

      expect(result).toEqual([
        { name: 'Option', slug: 'option', description: 'Option exercises', totalCount: 10 },
        { name: 'Either', slug: 'either', description: 'Either exercises', totalCount: 8 }
      ]);
      expect(exerciseService.getCategories).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no categories found', async () => {
      exerciseService.getCategories.mockResolvedValue([]);

      const result = await resolver.getCategories();

      expect(result).toEqual([]);
      expect(exerciseService.getCategories).toHaveBeenCalledTimes(1);
    });

    it('should handle service errors', async () => {
      exerciseService.getCategories.mockRejectedValue(new Error('Service error'));

      await expect(resolver.getCategories()).rejects.toThrow('Service error');
    });
  });

  describe('mapExerciseToGraphQL', () => {
    it('should map exercise with all fields', () => {
      const result = (resolver as any).mapExerciseToGraphQL(mockExerciseData);

      expect(result).toEqual({
        slug: 'option/01',
        category: 'option',
        number: '01',
        title: 'Basic Option Handling',
        description: 'Learn the basics of Option type',
        difficulty: 'easy',
        tags: ['option', 'basic'],
        starterCode: 'const result = ',
        solutionCode: 'const result = some(42)',
        imports: ['import { some, none } from "fp-ts/Option"'],
        conceptTitle: 'Option Fundamentals',
        goalStatement: 'Understand Option type',
        conceptExplanation: 'Option represents optional values',
        hints: ['Use map for transformations', 'Use getOrElse for defaults'],
        successCriteria: ['All tests pass', 'Code compiles'],
        estimatedTime: 15,
        theme: 'functional-programming'
      });
    });

    it('should default difficulty to easy when not provided', () => {
      const exerciseWithoutDifficulty = {
        ...mockExerciseData,
        metadata: {
          ...mockExerciseData.metadata,
          difficulty: undefined
        }
      };

      const result = (resolver as any).mapExerciseToGraphQL(exerciseWithoutDifficulty);

      expect(result.difficulty).toBe('easy');
    });

    it('should handle missing optional fields', () => {
      const minimalExercise = {
        metadata: {
          slug: 'test/01',
          category: 'test',
          number: '01',
          title: 'Test',
          description: 'Test exercise',
          tags: []
        },
        starterCode: '',
        solutionCode: '',
        imports: []
      };

      const result = (resolver as any).mapExerciseToGraphQL(minimalExercise);

      expect(result.conceptTitle).toBeUndefined();
      expect(result.hints).toBeUndefined();
      expect(result.estimatedTime).toBeUndefined();
    });
  });

  describe('mapCategoryToGraphQL', () => {
    it('should map category correctly', () => {
      const category = mockCategories[0];
      const result = (resolver as any).mapCategoryToGraphQL(category);

      expect(result).toEqual({
        name: 'Option',
        slug: 'option',
        description: 'Option exercises',
        totalCount: 10
      });
    });

    it('should handle category with zero count', () => {
      const emptyCategory = {
        name: 'Empty',
        slug: 'empty',
        description: 'No exercises',
        totalCount: 0
      };

      const result = (resolver as any).mapCategoryToGraphQL(emptyCategory);

      expect(result.totalCount).toBe(0);
    });
  });
});
