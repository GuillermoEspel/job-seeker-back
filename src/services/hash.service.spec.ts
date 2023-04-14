import { Test } from '@nestjs/testing';
import { HashService } from './hash.service';

describe('HashService', () => {
  let service: HashService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [HashService],
    }).compile();

    service = module.get(HashService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.hash).toBeDefined();
    expect(service.compare).toBeDefined();
  });

  describe('hash method', () => {
    it('should return hashed value.', () => {
      // Act
      const value = 'pass123';
      const result = service.hash(value);

      // Assert
      expect(result).toBeDefined();
    });
  });
  describe('compare method', () => {
    it('should return true when compare correct values.', () => {
      // Arrange
      const value = 'pass123';
      const hashedValue = service.hash(value);

      // Act
      const result = service.compare(value, hashedValue);

      // Assert
      expect(result).toBeTruthy();
    });
  });
});
