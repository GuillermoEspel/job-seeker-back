import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { closeDatabaseConnection, MongoDatabaseTestModule } from '../database';
import { UserRepository, RepositoriesModule } from '.';
import { CreateUserDto } from '../dtos';

describe('UserRepository', () => {
  let connection: Connection;
  let repository: UserRepository;
  const createUserDTO: CreateUserDto = {
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
    repository = module.get(UserRepository);
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
    it('should return id when create a user.', async () => {
      // Act
      const result = await repository.create(createUserDTO);

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
    it('should return null when not matched a user.', async () => {
      // Act
      const id = '640210d5b8bd3a0403032ac6';
      const result = await repository.getById(id);

      // Assert
      expect(result).toBeNull();
    });
    it('should return a user.', async () => {
      // Arrange
      const userIdA = await repository.create(createUserDTO);

      // Act
      const result = await repository.getById(userIdA);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(userIdA);
      expect(result.email).toBe(createUserDTO.email);
      expect(result.password).toBe(createUserDTO.password);
    });
  });
  describe('getByEmail method', () => {
    it('should return null when not matched a user.', async () => {
      // Act
      const email = 'example@gmail.com';
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeNull();
    });
    it('should return a user.', async () => {
      // Arrange
      const userIdA = await repository.create(createUserDTO);

      // Act
      const email = createUserDTO.email;
      const result = await repository.getByEmail(email);

      // Assert
      expect(result).toBeDefined();
      expect(result.id).toBe(userIdA);
      expect(result.email).toBe(createUserDTO.email);
      expect(result.password).toBe(createUserDTO.password);
    });
  });
  describe('getAll method', () => {
    it('should return a list of all users.', async () => {
      // Arrange
      const userIdA = await repository.create(createUserDTO);

      // Act
      const result = await repository.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBeTruthy();
      expect(result).toHaveLength(1);
      expect(result[0].id).toBe(userIdA);
    });
  });
});
