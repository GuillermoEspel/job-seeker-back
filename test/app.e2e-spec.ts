import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection } from 'mongoose';
import { AppModule } from './../src/app.module';
import { getConnectionToken, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoConfig } from '../src/database/mongo-database.config';
import { EnvironmentConfigService } from '../src/config';
import { AllExceptionFilter } from '../src/filters';
import { DtoException } from '../src/exceptions';

describe('AppModule (e2e)', () => {
  let app: INestApplication;
  let mongod: MongoMemoryServer;
  let connection: Connection;
  let version: string;

  beforeEach(async () => {
    // Initialize mongo memory server
    mongod = await MongoMemoryServer.create();
    class MongoConfigTest {
      createMongooseOptions(): MongooseModuleOptions {
        return { uri: mongod.getUri(), dbName: 'test' };
      }
    }

    // Create testing module
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MongoConfig)
      .useClass(MongoConfigTest)
      .compile();

    // Get instances
    connection = moduleFixture.get(getConnectionToken());
    const configService = moduleFixture.get(EnvironmentConfigService);

    // Create Nest Application
    app = moduleFixture.createNestApplication();
    version = configService.getAppConfig().version;
    app.setGlobalPrefix(version);
    // Filters
    app.useGlobalFilters(new AllExceptionFilter());
    // Pipes
    app.useGlobalPipes(
      new ValidationPipe({
        exceptionFactory: (errors) => {
          const details = errors.flatMap((err) =>
            !!err.constraints
              ? Object.values(err.constraints)
              : err.children.flatMap((item) => Object.values(item.constraints)),
          );
          throw new DtoException(details);
        },
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    jest.clearAllMocks();
    if (connection) await connection.close();
    if (mongod) await mongod.stop();
    await app.close();
  });

  it('should be defined.', () => {
    expect(app).toBeDefined();
  });

  describe('HealthController', () => {
    describe('GET /health', () => {
      it('should return 200 always.', async () => {
        // Act
        const result = await request(app.getHttpServer()).get(
          `/${version}/health`,
        );

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.text).toBe('Ok.');
      });
    });
  });
});
