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
        date: '2025-06-18T00:00:00.000Z',
        exercisesCompleted: 3,
        timeSpent: 900
      },
      {
        date: '2025-06-17T00:00:00.000Z',
        exercisesCompleted: 2,
        timeSpent: 600
      }
    ],
    categoryProgress: [
      {
        category: 'option',
        completed: 8,
        total: 10,
        percentage: 80
      },
      {
        category: 'either',
        completed: 7,
        total: 10,
        percentage: 70
      }
    ],
    nextRecommendedExercise: {
      slug: 'option/09',
      title: 'Advanced Option Handling',
      category: 'option',
      difficulty: 'medium'
    }
  };

  beforeEach(async () => {
    const mockProgressDashboardService = {
      getDashboardData: jest.fn(),
      trackSessionTime: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgressDashboardResolver,
        { provide: ProgressDashboardService, useValue: mockProgressDashboardService }
      ],
    }).compile();

    resolver = module.get<ProgressDashboardResolver>(ProgressDashboardResolver);
    progressDashboardService = module.get(ProgressDashboardService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getProgressDashboard', () => {
    it('should return dashboard data for valid session ID', async () => {
      progressDashboardService.getDashboardData.mockResolvedValue(mockDashboardData);

      const result = await resolver.getProgressDashboard('session-123');

      expect(result).toEqual(mockDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith('session-123');
    });

    it('should handle empty session ID', async () => {
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
      progressDashboardService.getDashboardData.mockResolvedValue(emptyDashboardData);

      const result = await resolver.getProgressDashboard('');

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith('');
    });

    it('should handle null session ID', async () => {
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
      progressDashboardService.getDashboardData.mockResolvedValue(emptyDashboardData);

      const result = await resolver.getProgressDashboard(null as any);

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith(null);
    });

    it('should handle service errors', async () => {
      progressDashboardService.getDashboardData.mockRejectedValue(new Error('Service error'));

      await expect(resolver.getProgressDashboard('session-123')).rejects.toThrow('Service error');
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith('session-123');
    });

    it('should handle non-existent session ID', async () => {
      const emptyDashboardData = {
        currentStreak: 0,
        longestStreak: 0,
        totalTimeSpent: 0,
        exercisesCompleted: 0,
        totalExercises: 20,
        weeklyProgress: [],
        categoryProgress: [],
        nextRecommendedExercise: null
      };
      progressDashboardService.getDashboardData.mockResolvedValue(emptyDashboardData);

      const result = await resolver.getProgressDashboard('non-existent-session');

      expect(result).toEqual(emptyDashboardData);
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith('non-existent-session');
    });

    it('should return dashboard data with null next recommended exercise', async () => {
      const dashboardDataWithoutRecommendation = {
        ...mockDashboardData,
        nextRecommendedExercise: null
      };
      progressDashboardService.getDashboardData.mockResolvedValue(dashboardDataWithoutRecommendation);

      const result = await resolver.getProgressDashboard('session-123');

      expect(result.nextRecommendedExercise).toBeNull();
      expect(progressDashboardService.getDashboardData).toHaveBeenCalledWith('session-123');
    });
  });

  describe('trackSessionTime', () => {
    it('should track session time and return true', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime('session-123', 300);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('session-123', 300);
    });

    it('should handle zero time spent', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime('session-123', 0);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('session-123', 0);
    });

    it('should handle negative time spent', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime('session-123', -100);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('session-123', -100);
    });

    it('should handle large time values', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime('session-123', 999999);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('session-123', 999999);
    });

    it('should handle service errors', async () => {
      progressDashboardService.trackSessionTime.mockRejectedValue(new Error('Database error'));

      await expect(resolver.trackSessionTime('session-123', 300)).rejects.toThrow('Database error');
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('session-123', 300);
    });

    it('should handle empty session ID', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime('', 300);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith('', 300);
    });

    it('should handle null session ID', async () => {
      progressDashboardService.trackSessionTime.mockResolvedValue(undefined);

      const result = await resolver.trackSessionTime(null as any, 300);

      expect(result).toBe(true);
      expect(progressDashboardService.trackSessionTime).toHaveBeenCalledWith(null, 300);
    });
  });
});
