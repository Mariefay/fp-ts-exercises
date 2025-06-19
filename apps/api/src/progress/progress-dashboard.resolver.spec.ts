import { Test, TestingModule } from '@nestjs/testing';
import { ProgressDashboardResolver } from './progress-dashboard.resolver.js';
import { ProgressDashboardService } from './progress-dashboard.service.js';

describe('ProgressDashboardResolver', () => {
  let resolver: ProgressDashboardResolver;
  let progressDashboardService: jest.Mocked<ProgressDashboardService>;

  const mockDashboardData = {
    currentStreak: 5,
    longestStreak: 10,
    totalTimeSpent: 3600,
    exercisesCompleted: 15,
    totalExercises: 20,
    weeklyProgress: [
      {
        id: '1',
        userId: 'user-123',
        date: '2025-06-18T00:00:00.000Z',
        exercisesCompleted: 3,
        timeSpent: 900,
      },
      {
        id: '2',
        userId: 'user-123',
        date: '2025-06-17T00:00:00.000Z',
        exercisesCompleted: 2,
        timeSpent: 600,
      },
    ],

    categoryProgress: [
      {
        category: 'option',
        completed: 8,
        total: 10,
        percentage: 80,
      },
      {
        category: 'either',
        completed: 7,
        total: 10,
        percentage: 70,
      },
    ],
    nextRecommendedExercise: {
      slug: 'option/09',
      title: 'Advanced Option Handling',
      category: 'option',
      difficulty: 'medium',
    },
  };

  beforeEach(async () => {
    const mockProgressDashboardService = {
      getDashboardData: jest.fn(),
      trackSessionTime: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressDashboardResolver,
        {
          provide: ProgressDashboardService,
          useValue: mockProgressDashboardService,
        },
      ],
    }).compile();

    resolver = module.get<ProgressDashboardResolver>(ProgressDashboardResolver);
    progressDashboardService = module.get(ProgressDashboardService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getProgressDashboard', () => {
    it('should return dashboard data for valid user', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.getDashboardData.mockResolvedValue(
        mockDashboardData
      );

      const result = await resolver.getProgressDashboard(mockContext);

      expect(result).toEqual(mockDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        'user-123'
      );
    });

    it('should handle empty user ID', async () => {
      const mockContext = { req: { user: { id: '' } } };
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null,
      };
      progressDashboardService.getDashboardData.mockResolvedValue(
        emptyDashboardData
      );

      const result = await resolver.getProgressDashboard(mockContext);

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        ''
      );
    });

    it('should handle null user ID', async () => {
      const mockContext = { req: { user: { id: null } } };
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null,
      };
      progressDashboardService.getDashboardData.mockResolvedValue(
        emptyDashboardData
      );

      const result = await resolver.getProgressDashboard(mockContext as any);

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        null
      );
    });

    it('should handle service errors', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.getDashboardData.mockRejectedValue(
        new Error('Service error')
      );

      await expect(
        resolver.getProgressDashboard(mockContext)
      ).rejects.toThrow('Service error');
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        'user-123'
      );
    });

    it('should handle non-existent user ID', async () => {
      const mockContext = { req: { user: { id: 'non-existent-user' } } };
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null,
      };
      progressDashboardService.getDashboardData.mockResolvedValue(
        emptyDashboardData
      );

      const result = await resolver.getProgressDashboard(mockContext);

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        'non-existent-user'
      );
    });

    it('should return dashboard data with null next recommended exercise', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      const dashboardDataWithoutRecommendation = {
        ...mockDashboardData,
        nextRecommendedExercise: null,
      };
      progressDashboardService.getDashboardData.mockResolvedValue(
        dashboardDataWithoutRecommendation
      );

      const result = await resolver.getProgressDashboard(mockContext);

      expect(result.nextRecommendedExercise).toBeNull();
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(
        'user-123'
      );
    });
  });

  describe('trackSessionTime', () => {
    it('should track session time and return true', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(300, mockContext);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        'user-123',
        300
      );
    });

    it('should handle zero time spent', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(0, mockContext);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        'user-123',
        0
      );
    });

    it('should handle negative time spent', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(-100, mockContext);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        'user-123',
        -100
      );
    });

    it('should handle large time values', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(999999, mockContext);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        'user-123',
        999999
      );
    });

    it('should handle service errors', async () => {
      const mockContext = { req: { user: { id: 'user-123' } } };
      progressDashboardService.trackSessionTime.mockRejectedValue(
        new Error('Database error')
      );

      await expect(
        resolver.trackSessionTime(300, mockContext)
      ).rejects.toThrow('Database error');
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        'user-123',
        300
      );
    });

    it('should handle empty user ID', async () => {
      const mockContext = { req: { user: { id: '' } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(300, mockContext);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        '',
        300
      );
    });

    it('should handle null user ID', async () => {
      const mockContext = { req: { user: { id: null } } };
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(300, mockContext as any);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(
        null,
        300
      );
    });
  });
});
