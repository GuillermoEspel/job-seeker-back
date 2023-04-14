import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { closeDatabaseConnection, MongoDatabaseTestModule } from '../database';
import { CompanyRepository, RepositoriesModule } from '.';
import { CreateCompanyDto, UpdateCompanyDto } from '../dtos';

describe('CompanyRepository', () => {
  let connection: Connection;
  let repository: CompanyRepository;
  const createCompanyDto: CreateCompanyDto = {
    email: 'albert@gmail.com',
    password: 'pass123',
    name: 'Company A',
    logo: 'logo.png',
  };

  beforeEach(async () => {
    // Create testing module
    const module = await Test.createTestingModule({
      imports: [MongoDatabaseTestModule, RepositoriesModule],
    }).compile();

    // Get instances
    connection = await module.get(getConnectionToken());
    repository = module.get(CompanyRepository);
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
    it('should return id when create a company.', async () => {
      // Act
      const result = await repository.create(createCompanyDto);

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
    it('should return null when not matched a company.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const result = await repository.getById(id);

      // Assert
      expect(result).toBeNull();
    });
    it('should return a company.', async () => {
      // Arrange
      const companyIdA = await repository.create(createCompanyDto);

      // Act
      const result = await repository.getById(companyIdA);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(companyIdA);
      expect(result.email).toBe(createCompanyDto.email);
      expect(result.password).toBe(createCompanyDto.password);
    });
  });
  describe('getByEmail method', () => {
    it('should return null when not matched a company.', async () => {
      // Act
      const email = 'example@gmail.com';
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeNull();
    });
    it('should return a company.', async () => {
      // Arrange
      const companyIdA = await repository.create(createCompanyDto);

      // Act
      const email = createCompanyDto.email;
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(companyIdA);
      expect(result.email).toBe(createCompanyDto.email);
      expect(result.password).toBe(createCompanyDto.password);
    });
  });
  describe('getAll method', () => {
    it('should return a list of all companies.', async () => {
      // Arrange
      const companyIdA = await repository.create(createCompanyDto);

      // Act
      const result = await repository.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(companyIdA);
    });
  });

  describe('updateById method', () => {
    it('should throw error when id is invalid', async () => {
      // Act + Assert
      const id = '123456';
      const update: UpdateCompanyDto = {
        logo: 'newlogo.png',
      };
      expect(repository.updateById(id, update)).rejects.toThrowError(
        new Error('Invalid id'),
      );
    });
    it('should return false when not matched a company.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const update: UpdateCompanyDto = {
        logo: 'newlogo.png',
      };
      const result = await repository.updateById(id, update);

      // Assert
      expect(result).toBeFalsy();
    });
    it('should update a company.', async () => {
      // Arrange
      const companyIdA = await repository.create(createCompanyDto);

      // Act
      const update: UpdateCompanyDto = {
        logo: 'newlogo.png',
      };
      const result = await repository.updateById(companyIdA, update);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
      const company = await repository.getById(companyIdA);
      expect(company.id).toBe(companyIdA);
      expect(company.email).toBe(createCompanyDto.email);
      expect(company.password).toBe(createCompanyDto.password);
      expect(company.name).toBe(createCompanyDto.name);
      expect(company.logo).toBe(update.logo);
    });
  });
});
