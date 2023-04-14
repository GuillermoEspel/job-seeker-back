import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { closeDatabaseConnection, MongoDatabaseTestModule } from '../database';
import { CompanyRepository, JobRepository, RepositoriesModule } from '.';
import { CreateJobDto, UpdateJobDto } from '../dtos';
import { ApplicantEntity, JobEntity } from '../entities';

describe('JobRepository', () => {
  let connection: Connection;
  let repository: JobRepository;
  let spyCompanyRepository: CompanyRepository;
  let createJobDto: CreateJobDto;
  let applicant: ApplicantEntity;
  let job: JobEntity;

  beforeEach(async () => {
    // Create testing module
    const module = await Test.createTestingModule({
      imports: [MongoDatabaseTestModule, RepositoriesModule],
    }).compile();

    // Get instances
    connection = await module.get(getConnectionToken());
    repository = module.get(JobRepository);
    spyCompanyRepository = module.get(CompanyRepository);

    // Prepare data for tests
    const companyId = await spyCompanyRepository.create({
      email: 'comany1@smtp.com',
      password: 'pass1234',
      name: 'Company A',
      logo: 'logo.png',
    });

    createJobDto = {
      companyId,
      title: 'Title A',
      description: 'Description A',
    };
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
    expect(repository.getAll).toBeDefined();
    expect(repository.updateById).toBeDefined();
  });

  describe('create method', () => {
    it('should return id when create a job.', async () => {
      // Act
      const result = await repository.create(createJobDto);

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
    it('should return null when not matched a job.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const result = await repository.getById(id);

      // Assert
      expect(result).toBeNull();
    });
    it('should return a job.', async () => {
      // Arrange
      const jobIdA = await repository.create(createJobDto);

      // Act
      const result = await repository.getById(jobIdA);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(jobIdA);
      expect(result.title).toBe(createJobDto.title);
      expect(result.description).toBe(createJobDto.description);
      expect(result.companyId).toBe(createJobDto.companyId);
    });
  });
  describe('getAll method', () => {
    it('should return a list of all jobs.', async () => {
      // Arrange
      const jobIdA = await repository.create(createJobDto);

      // Act
      const result = await repository.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(jobIdA);
    });
  });

  describe('updateById method', () => {
    it('should throw error when id is invalid', async () => {
      // Act + Assert
      const id = '123456';
      const update: UpdateJobDto = {
        description: 'New Description',
      };
      expect(repository.updateById(id, update)).rejects.toThrowError(
        new Error('Invalid id'),
      );
    });
    it('should return false when not matched a job.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const update: UpdateJobDto = {
        description: 'New Description',
      };
      const result = await repository.updateById(id, update);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should update a job.', async () => {
      // Arrange
      const jobIdA = await repository.create(createJobDto);

      // Act
      const update: UpdateJobDto = {
        description: 'New Description',
      };
      const result = await repository.updateById(jobIdA, update);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
      const job = await repository.getById(jobIdA);
      expect(job.id).toBe(jobIdA);
      expect(job.title).toBe(createJobDto.title);
      expect(job.description).toBe(update.description);
      expect(job.companyId).toBe(createJobDto.companyId);
    });
  });
});
