import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { closeDatabaseConnection, MongoDatabaseTestModule } from '../database';
import { ApplicantRepository, RepositoriesModule } from '.';
import { CreateApplicantDto } from '../dtos';

describe('ApplicantRepository', () => {
  let connection: Connection;
  let repository: ApplicantRepository;
  const createApplicantDto: CreateApplicantDto = {
    email: 'albert@gmail.com',
    password: 'pass123',
  };

  beforeEach(async () => {
    // Create testing module
    const module = await Test.createTestingModule({
      imports: [MongoDatabaseTestModule, RepositoriesModule],
    }).compile();

    // Get instances
    connection = await module.get(getConnectionToken());
    repository = module.get(ApplicantRepository);
  });

  afterEach(async () => {
    jest.clearAllMocks();
    if (connection) await connection.close();
    await closeDatabaseConnection();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(repository.create).toBeDefined();
    expect(repository.getById).toBeDefined();
    expect(repository.getByEmail).toBeDefined();
    expect(repository.getAll).toBeDefined();
    expect(repository.updateById).toBeDefined();
  });

  describe('create method', () => {
    it('should return id when create an applicant.', async () => {
      // Act
      const result = await repository.create(createApplicantDto);

      // Assert
      expect(result).toBeDefined();
    });
  });
  describe('getById method', () => {
    it('should throw error when id is invalid', async () => {
      // Act + Assert
      const id = '123456';
      expect(repository.getById(id)).rejects.toThrowError(
        new Error('Invalid id'),
      );
    });
    it('should return null when not matched an applicant.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const result = await repository.getById(id);

      // Assert
      expect(result).toBeNull();
    });
    it('should return an applicant.', async () => {
      // Arrange
      const applicantIdA = await repository.create(createApplicantDto);

      // Act
      const result = await repository.getById(applicantIdA);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(applicantIdA);
      expect(result.email).toBe(createApplicantDto.email);
      expect(result.password).toBe(createApplicantDto.password);
    });
  });
  describe('getByEmail method', () => {
    it('should return null when not matched an applicant.', async () => {
      // Act
      const email = 'example@gmail.com';
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeNull();
    });
    it('should return an applicant.', async () => {
      // Arrange
      const applicantIdA = await repository.create(createApplicantDto);

      // Act
      const email = createApplicantDto.email;
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(applicantIdA);
      expect(result.email).toBe(createApplicantDto.email);
      expect(result.password).toBe(createApplicantDto.password);
    });
  });
  describe('getAll method', () => {
    it('should return a list of all applicants.', async () => {
      // Arrange
      const applicantIdA = await repository.create(createApplicantDto);

      // Act
      const result = await repository.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(applicantIdA);
    });
  });
});
