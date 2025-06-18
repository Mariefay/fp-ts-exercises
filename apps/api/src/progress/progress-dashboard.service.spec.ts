import { Test, TestingModule } from '@nestjs/testing';
import { ProgressDashboardService } from './progress-dashboard.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExerciseValidationService } from '../exercise/exercise-validation.service.js';
import { ExerciseDiscoveryWrapper } from '../exercise/exercise-discovery.wrapper.js';

describe('ProgressDashboardService', () => {
  let service: ProgressDashboardService;
  let prismaService: jest.Mocked<PrismaService>;
  let validationService: jest.Mocked<ExerciseValidationService>;
  let exerciseWrapper: jest.Mocked<ExerciseDiscoveryWrapper>;

  const mockSession = {
    id: 'session-123',
    currentStreak: 5,
    longestStreak: 10,
    totalTimeSpent: 3600,
    completedExercises: [
      { id: '1', exerciseSlug: 'option/01', sessionId: 'session-123', completedAt: new Date(), timeSpent: 300 },
      { id: '2', exerciseSlug: 'option/02', sessionId: 'session-123', completedAt: new Date(), timeSpent: 450 }
    ],
    sessionMetrics: [
      { id: '1', sessionId: 'session-123', date: new Date('2025-06-18'), exercisesCompleted: 2, timeSpent: 750 },
      { id: '2', sessionId: 'session-123', date: new Date('2025-06-17'), exercisesCompleted: 1, timeSpent: 300 }
    ]
  };

  const mockValidationResult = {
    isValid: true,
    totalExercises: 20,
    categoryValidation: [],
    issues: []
  };

  const mockCategories = [
    { name: 'Option', slug: 'option', description: 'Option exercises', totalCount: 10 },
    { name: 'Either', slug: 'either', description: 'Either exercises', totalCount: 8 }
  ];

  const mockExercises = [
    {
      metadata: {
        slug: 'option/03',
        title: 'Working with Option',
        category: 'option',
        difficulty: 'easy',
        number: '03'
      }
    },
    {
      metadata: {
        slug: 'either/01',
        title: 'Working with Either',
        category: 'either',
        difficulty: 'medium',
        number: '01'
      }
    }
  ];

  beforeEach(async () => {
    const mockPrismaService = {
      session: {
        findUnique: jest.fn(),
        update: jest.fn()
      },
      completedExercise: {
        count: jest.fn(),
        findMany: jest.fn()
      }
    };

    const mockValidationService = {
      validateExerciseSystem: jest.fn()
    };

    const mockExerciseWrapper = {
      getCategories: jest.fn(),
      getExercises: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressDashboardService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: ExerciseValidationService, useValue: mockValidationService },
        { provide: ExerciseDiscoveryWrapper, useValue: mockExerciseWrapper }
      ],
    }).compile();

    service = module.get<ProgressDashboardService>(ProgressDashboardService);
    prismaService = module.get(PrismaService);
    validationService = module.get(ExerciseValidationService);
    exerciseWrapper = module.get(ExerciseDiscoveryWrapper);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardData', () => {
    beforeEach(() => {
      validationService.validateExerciseSystem.mockResolvedValue(mockValidationResult);
      exerciseWrapper.getCategories.mockResolvedValue(mockCategories);
      exerciseWrapper.getExercises.mockResolvedValue(mockExercises);
    });

    it('should return default data when sessionId is empty', async () => {
      const result = await service.getDashboardData('');

      expect(result).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      });
      expect(validationService.validateExerciseSystem).toHaveBeenCalled();
      expect(prismaService.session.findUnique).not.toHaveBeenCalled();
    });

    it('should return default data when sessionId is null', async () => {
      const result = await service.getDashboardData(null as any);

      expect(result).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      });
    });

    it('should return default data when session is not found', async () => {
      prismaService.session.findUnique.mockResolvedValue(null);

      const result = await service.getDashboardData('non-existent-session');

      expect(result).toEqual({
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      });
      expect(prismaService.session.findUnique).toHaveBeenCalledWith({
        where: { id: 'non-existent-session' },
        include: {
          completedExercises: true,
          sessionMetrics: true
        }
      });
    });

    it('should return complete dashboard data for valid session', async () => {
      prismaService.session.findUnique.mockResolvedValue(mockSession);
      prismaService.completedExercise.count
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(0);
      prismaService.completedExercise.findMany.mockResolvedValue([
        { exerciseSlug: 'option/01' },
        { exerciseSlug: 'option/02' }
      ]);

      const result = await service.getDashboardData('session-123');

      expect(result).toEqual({
        currentStreak: 5,
        longestStreak: 10,
        totalTimeSpent: 3600,
        exercisesCompleted: 2,
        totalExercises: 20,
        weeklyProgress: [
          {
            id: '1',
            sessionId: 'session-123',
            date: '2025-06-18T00:00:00.000Z',
            exercisesCompleted: 2,
            timeSpent: 750
          },
          {
            id: '2',
            sessionId: 'session-123',
            date: '2025-06-17T00:00:00.000Z',
            exercisesCompleted: 1,
            timeSpent: 300
          }
        ],
        categoryProgress: [
          { category: 'option', completed: 2, total: 10, percentage: 20 },
          { category: 'either', completed: 0, total: 8, percentage: 0 }
        ],
        nextRecommendedExercise: {
          slug: 'option/03',
          title: 'Working with Option',
          category: 'option',
          difficulty: 'easy'
        }
      });
    });

    it('should handle validation service errors', async () => {
      validationService.validateExerciseSystem.mockRejectedValue(new Error('Validation failed'));

      await expect(service.getDashboardData('session-123')).rejects.toThrow('Validation failed');
    });

    it('should handle database errors', async () => {
      prismaService.session.findUnique.mockRejectedValue(new Error('Database error'));

      await expect(service.getDashboardData('session-123')).rejects.toThrow('Database error');
    });

    it('should return null for next recommended exercise when all exercises are completed', async () => {
      prismaService.session.findUnique.mockResolvedValue(mockSession);
      prismaService.completedExercise.count.mockResolvedValue(0);
      prismaService.completedExercise.findMany.mockResolvedValue([
        { exerciseSlug: 'option/03' },
        { exerciseSlug: 'either/01' }
      ]);

      const result = await service.getDashboardData('session-123');

      expect(result.nextRecommendedExercise).toBeNull();
    });

    it('should sort exercises by difficulty for recommendations', async () => {
      const exercisesWithDifficulty = [
        {
          metadata: {
            slug: 'option/hard',
            title: 'Hard Option',
            category: 'option',
            difficulty: 'hard',
            number: '05'
          }
        },
        {
          metadata: {
            slug: 'option/easy',
            title: 'Easy Option',
            category: 'option',
            difficulty: 'easy',
            number: '03'
          }
        },
        {
          metadata: {
            slug: 'option/medium',
            title: 'Medium Option',
            category: 'option',
            difficulty: 'medium',
            number: '04'
          }
        }
      ];

      prismaService.session.findUnique.mockResolvedValue(mockSession);
      prismaService.completedExercise.count.mockResolvedValue(0);
      prismaService.completedExercise.findMany.mockResolvedValue([]);
      exerciseWrapper.getExercises.mockResolvedValue(exercisesWithDifficulty);

      const result = await service.getDashboardData('session-123');

      expect(result.nextRecommendedExercise?.difficulty).toBe('easy');
      expect(result.nextRecommendedExercise?.slug).toBe('option/easy');
    });
  });

  describe('trackSessionTime', () => {
    it('should update session time spent', async () => {
      prismaService.session.update.mockResolvedValue(mockSession);

      await service.trackSessionTime('session-123', 300);

      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'session-123' },
        data: {
          totalTimeSpent: {
            increment: 300
          }
        }
      });
    });

    it('should handle database errors when tracking time', async () => {
      prismaService.session.update.mockRejectedValue(new Error('Database error'));

      await expect(service.trackSessionTime('session-123', 300)).rejects.toThrow('Database error');
    });

    it('should handle negative time values', async () => {
      prismaService.session.update.mockResolvedValue(mockSession);

      await service.trackSessionTime('session-123', -100);

      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'session-123' },
        data: {
          totalTimeSpent: {
            increment: -100
          }
        }
      });
    });

    it('should handle zero time values', async () => {
      prismaService.session.update.mockResolvedValue(mockSession);

      await service.trackSessionTime('session-123', 0);

      expect(prismaService.session.update).toHaveBeenCalledWith({
        where: { id: 'session-123' },
        data: {
          totalTimeSpent: {
            increment: 0
          }
        }
      });
    });
  });
});
