import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseService } from './exercise.service.js';
import { ExerciseDiscoveryWrapper } from './exercise-discovery.wrapper.js';

describe('ExerciseService', () => {
  let service: ExerciseService;
  let exerciseWrapper: jest.Mocked<ExerciseDiscoveryWrapper>;

  const mockExercises = [
    {
      metadata: {
        slug: 'option/01',
        title: 'Basic Option',
        category: 'option',
        difficulty: 'easy',
        number: '01'
      }
    },
    {
      metadata: {
        slug: 'option/02',
        title: 'Advanced Option',
        category: 'option',
        difficulty: 'medium',
        number: '02'
      }
    },
    {
      metadata: {
        slug: 'either/01',
        title: 'Basic Either',
        category: 'either',
        difficulty: 'easy',
        number: '01'
      }
    }
  ];

  const mockCategories = [
    { name: 'Option', slug: 'option', description: 'Option exercises', totalCount: 10 },
    { name: 'Either', slug: 'either', description: 'Either exercises', totalCount: 8 }
  ];

  beforeEach(async () => {
    const mockExerciseWrapper = {
      getExercises: jest.fn(),
      getExerciseBySlug: jest.fn(),
      getExercisesByCategory: jest.fn(),
      getCategories: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        { provide: ExerciseDiscoveryWrapper, useValue: mockExerciseWrapper }
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
    exerciseWrapper = module.get(ExerciseDiscoveryWrapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getExercises', () => {
    it('should return all exercises', async () => {
      exerciseWrapper.getExercises.mockResolvedValue(mockExercises);

      const result = await service.getExercises();

      expect(result).toEqual(mockExercises);
      expect(exerciseWrapper.getExercises).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no exercises found', async () => {
      exerciseWrapper.getExercises.mockResolvedValue([]);

      const result = await service.getExercises();

      expect(result).toEqual([]);
      expect(exerciseWrapper.getExercises).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from exercise wrapper', async () => {
      exerciseWrapper.getExercises.mockRejectedValue(new Error('Failed to load exercises'));

      await expect(service.getExercises()).rejects.toThrow('Failed to load exercises');
    });
  });

  describe('getExerciseBySlug', () => {
    it('should return exercise for valid slug', async () => {
      const expectedExercise = mockExercises[0];
      exerciseWrapper.getExerciseBySlug.mockResolvedValue(expectedExercise);

      const result = await service.getExerciseBySlug('option/01');

      expect(result).toEqual(expectedExercise);
      expect(exerciseWrapper.getExerciseBySlug).toHaveBeenCalledWith('option/01');
    });

    it('should return null for non-existent slug', async () => {
      exerciseWrapper.getExerciseBySlug.mockResolvedValue(null);

      const result = await service.getExerciseBySlug('non-existent');

      expect(result).toBeNull();
      expect(exerciseWrapper.getExerciseBySlug).toHaveBeenCalledWith('non-existent');
    });

    it('should handle empty slug', async () => {
      exerciseWrapper.getExerciseBySlug.mockResolvedValue(null);

      const result = await service.getExerciseBySlug('');

      expect(result).toBeNull();
      expect(exerciseWrapper.getExerciseBySlug).toHaveBeenCalledWith('');
    });

    it('should handle errors from exercise wrapper', async () => {
      exerciseWrapper.getExerciseBySlug.mockRejectedValue(new Error('Failed to load exercise'));

      await expect(service.getExerciseBySlug('option/01')).rejects.toThrow('Failed to load exercise');
    });

    it('should handle null slug', async () => {
      exerciseWrapper.getExerciseBySlug.mockResolvedValue(null);

      const result = await service.getExerciseBySlug(null as any);

      expect(result).toBeNull();
      expect(exerciseWrapper.getExerciseBySlug).toHaveBeenCalledWith(null);
    });
  });

  describe('getExercisesByCategory', () => {
    it('should return exercises for valid category', async () => {
      const optionExercises = mockExercises.filter(ex => ex.metadata.category === 'option');
      exerciseWrapper.getExercisesByCategory.mockResolvedValue(optionExercises);

      const result = await service.getExercisesByCategory('option');

      expect(result).toEqual(optionExercises);
      expect(exerciseWrapper.getExercisesByCategory).toHaveBeenCalledWith('option');
    });

    it('should return empty array for non-existent category', async () => {
      exerciseWrapper.getExercisesByCategory.mockResolvedValue([]);

      const result = await service.getExercisesByCategory('non-existent');

      expect(result).toEqual([]);
      expect(exerciseWrapper.getExercisesByCategory).toHaveBeenCalledWith('non-existent');
    });

    it('should handle empty category', async () => {
      exerciseWrapper.getExercisesByCategory.mockResolvedValue([]);

      const result = await service.getExercisesByCategory('');

      expect(result).toEqual([]);
      expect(exerciseWrapper.getExercisesByCategory).toHaveBeenCalledWith('');
    });

    it('should handle errors from exercise wrapper', async () => {
      exerciseWrapper.getExercisesByCategory.mockRejectedValue(new Error('Failed to load category exercises'));

      await expect(service.getExercisesByCategory('option')).rejects.toThrow('Failed to load category exercises');
    });

    it('should handle null category', async () => {
      exerciseWrapper.getExercisesByCategory.mockResolvedValue([]);

      const result = await service.getExercisesByCategory(null as any);

      expect(result).toEqual([]);
      expect(exerciseWrapper.getExercisesByCategory).toHaveBeenCalledWith(null);
    });
  });

  describe('getCategories', () => {
    it('should return all categories', async () => {
      exerciseWrapper.getCategories.mockResolvedValue(mockCategories);

      const result = await service.getCategories();

      expect(result).toEqual(mockCategories);
      expect(exerciseWrapper.getCategories).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no categories found', async () => {
      exerciseWrapper.getCategories.mockResolvedValue([]);

      const result = await service.getCategories();

      expect(result).toEqual([]);
      expect(exerciseWrapper.getCategories).toHaveBeenCalledTimes(1);
    });

    it('should handle errors from exercise wrapper', async () => {
      exerciseWrapper.getCategories.mockRejectedValue(new Error('Failed to load categories'));

      await expect(service.getCategories()).rejects.toThrow('Failed to load categories');
    });
  });
});
