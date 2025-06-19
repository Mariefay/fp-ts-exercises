import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './auth.resolver.js';
import { AuthService } from './auth.service.js';

describe('AuthResolver', () => {
  let resolver: AuthResolver;
  let authService: jest.Mocked<AuthService>;

  const mockAuthPayload = {
    token: 'jwt-token',
    user: {
      id: 'user-123',
      email: 'test@example.com',
      name: 'Test User',
    },
  };

  beforeEach(async () => {
    const mockAuthService = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthResolver,
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    resolver = module.get<AuthResolver>(AuthResolver);
    authService = module.get(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      authService.register.mockResolvedValue(mockAuthPayload);

      const result = await resolver.registerUser(
        'test@example.com',
        'password123',
        'Test User'
      );

      expect(result).toBe(JSON.stringify(mockAuthPayload));
      expect(authService.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
    });

    it('should register user without name', async () => {
      const payloadWithoutName = {
        ...mockAuthPayload,
        user: { ...mockAuthPayload.user, name: null as any },
      };
      authService.register.mockResolvedValue(payloadWithoutName);

      const result = await resolver.registerUser(
        'test@example.com',
        'password123'
      );

      expect(result).toBe(JSON.stringify(payloadWithoutName));
      expect(authService.register).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        name: undefined,
      });
    });

    it('should handle registration errors', async () => {
      authService.register.mockRejectedValue(new Error('Registration failed'));

      await expect(
        resolver.registerUser('test@example.com', 'password123', 'Test User')
      ).rejects.toThrow('Registration failed');
    });
  });

  describe('loginUser', () => {
    it('should login user successfully', async () => {
      authService.login.mockResolvedValue(mockAuthPayload);

      const result = await resolver.loginUser('test@example.com', 'password123');

      expect(result).toBe(JSON.stringify(mockAuthPayload));
      expect(authService.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should handle login errors', async () => {
      authService.login.mockRejectedValue(new Error('Invalid credentials'));

      await expect(
        resolver.loginUser('test@example.com', 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('logoutUser', () => {
    it('should return true for logout', async () => {
      const result = await resolver.logoutUser();
      expect(result).toBe(true);
    });
  });
});
