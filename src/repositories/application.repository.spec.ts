import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { closeDatabaseConnection, MongoDatabaseTestModule } from '../database';
import {
  ApplicantRepository,
  ApplicationRepository,
  CompanyRepository,
  JobRepository,
  RepositoriesModule,
} from '.';
import { CreateApplicationBDDto, UpdateApplicationDto } from '../dtos';
import { ApplicantEntity, JobEntity } from '../entities';
import { ApplicationStatus } from '../enums';

describe('ApplicationRepository', () => {
  let connection: Connection;
  let repository: ApplicationRepository;
  let spyApplicantRepository: ApplicantRepository;
  let spyCompanyRepository: CompanyRepository;
  let spyJobRepository: JobRepository;
  let createApplicationDto: CreateApplicationBDDto;
  let applicant: ApplicantEntity;
  let job: JobEntity;

  beforeEach(async () => {
    // Create testing module
    const module = await Test.createTestingModule({
      imports: [MongoDatabaseTestModule, RepositoriesModule],
    }).compile();

    // Get instances
    connection = await module.get(getConnectionToken());
    repository = module.get(ApplicationRepository);
    spyApplicantRepository = module.get(ApplicantRepository);
    spyCompanyRepository = module.get(CompanyRepository);
    spyJobRepository = module.get(JobRepository);

    // Prepare data for tests
    const applicantId = await spyApplicantRepository.create({
      email: 'applicant1@smtp.com',
      password: 'pass123',
    });
    applicant = await spyApplicantRepository.getById(applicantId);
    const companyId = await spyCompanyRepository.create({
      email: 'comany1@smtp.com',
      password: 'pass1234',
      name: 'Company A',
      logo: 'logo.png',
    });
    const jobId = await spyJobRepository.create({
      title: 'Title A',
      description: 'Description A',
      companyId: companyId,
    });
    job = await spyJobRepository.getById(jobId);

    createApplicationDto = {
      jobId,
      applicantId,
      status: ApplicationStatus.PENDING,
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
    it('should return id when create an application.', async () => {
      // Act
      const result = await repository.create(createApplicationDto);

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
    it('should return null when not matched an application.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const result = await repository.getById(id);

      // Assert
      expect(result).toBeNull();
    });
    it('should return an application.', async () => {
      // Arrange
      const applicationIdA = await repository.create(createApplicationDto);

      // Act
      const result = await repository.getById(applicationIdA);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(applicationIdA);
      expect(result.jobId).toBe(createApplicationDto.jobId);
      expect(result.applicantId).toBe(createApplicationDto.applicantId);
      expect(result.status).toBe(createApplicationDto.status);
    });
  });
  describe('getAll method', () => {
    it('should return a list of all applications.', async () => {
      // Arrange
      const applicationIdA = await repository.create(createApplicationDto);

      // Act
      const result = await repository.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(applicationIdA);
    });
  });

  describe('updateById method', () => {
    it('should throw error when id is invalid', async () => {
      // Act + Assert
      const id = '123456';
      const update: UpdateApplicationDto = {
        status: ApplicationStatus.CLOSED,
      };
      expect(repository.updateById(id, update)).rejects.toThrowError(
        new Error('Invalid id'),
      );
    });
    it('should return false when not matched an application.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const update: UpdateApplicationDto = {
        status: ApplicationStatus.CLOSED,
      };
      const result = await repository.updateById(id, update);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should update an application.', async () => {
      // Arrange
      const applicationIdA = await repository.create(createApplicationDto);

      // Act
      const update: UpdateApplicationDto = {
        status: ApplicationStatus.CLOSED,
      };
      const result = await repository.updateById(applicationIdA, update);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
      const application = await repository.getById(applicationIdA);
      expect(application.id).toBe(applicationIdA);
      expect(application.jobId).toBe(createApplicationDto.jobId);
      expect(application.applicantId).toBe(createApplicationDto.applicantId);
      expect(application.status).toBe(update.status);
    });
  });
});
