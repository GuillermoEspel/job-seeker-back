import { Test } from '@nestjs/testing';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JWTApplicantService } from './jwt-applicant.service';
import { EnvironmentConfigService, JwtApplicantConfig } from '../config';
import { AuthApplicantPayload } from '../interfaces';

describe('JWTApplicantService', () => {
  let service: JWTApplicantService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [Jwt.register({})],
      providers: [
        JWTApplicantService,
        {
          provide: EnvironmentConfigService,
          useValue: {
            getJwtApplicantConfig: jest.fn().mockImplementation(
              (): JwtApplicantConfig => ({
                secret: 'my-secret',
                expiresIn: '30m',
                refreshSecret: 'my-refresh-secret',
                refreshExpiresIn: '1d',
              }),
            ),
          },
        },
      ],
    }).compile();

    service = module.get(JWTApplicantService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.generateToken).toBeDefined();
    expect(service.verifyToken).toBeDefined();
    expect(service.generateRefreshToken).toBeDefined();
    expect(service.verifyRefreshToken).toBeDefined();
  });

  describe('generateToken method', () => {
    it('should return token.', () => {
      // Act
      const payload: AuthApplicantPayload = {
        id: '123456789',
      };
      const result = service.generateToken(payload);

      // Assert
      expect(result).toBeDefined();
    });
  });
  describe('verifyToken method', () => {
    it('should return payload from token.', () => {
      // Arrange
      const payload: AuthApplicantPayload = {
        id: '123456789',
      };
      const token = service.generateToken(payload);

      // Act
      const result = service.verifyToken(token);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(payload.id);
    });
  });
  describe('generateRefreshToken method', () => {
    it('should return refresh token.', () => {
      // Act
      const payload: AuthApplicantPayload = {
        id: '123456789',
      };
      const result = service.generateRefreshToken(payload);

      // Assert
      expect(result).toBeDefined();
    });
  });
  describe('verifyRefreshToken method', () => {
    it('should return payload from refresh token.', () => {
      // Arrange
      const payload: AuthApplicantPayload = {
        id: '123456789',
      };
      const token = service.generateRefreshToken(payload);

      // Act
      const result = service.verifyRefreshToken(token);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(payload.id);
    });
  });
});
