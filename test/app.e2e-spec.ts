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
import { CreateApplicantDto, UpdateApplicantDto } from '../src/dtos';
import { ApplicantPresenter } from '../src/presenters';

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

  describe('ApplicantController', () => {
    describe('POST /applicants', () => {
      it('should return 201 when create an applicant.', async () => {
        // Act
        const dto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(201);
        expect(result.body).toBeDefined();
        const body: ApplicantPresenter = result.body;
        expect(body.id).toBeDefined();
        expect(body.email).toBe(dto.email);
      });
    });
    describe('GET /applicants/:id', () => {
      it('should return 200 when return an applicant.', async () => {
        // Arrange
        const createApplicantDto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        const newApplicantResult = await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(createApplicantDto);
        const newApplicantBodyResult: ApplicantPresenter =
          newApplicantResult.body;

        // Act
        const id = newApplicantBodyResult.id;
        const result = await request(app.getHttpServer()).get(
          `/${version}/applicants/${id}`,
        );

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: ApplicantPresenter = result.body;
        expect(body.id).toBe(id);
        expect(body.email).toBe(createApplicantDto.email);
      });
    });
    describe('GET /applicants', () => {
      it('should return 200 when return a list of applicants.', async () => {
        // Arrange
        const createApplicantDto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        const newApplicantResult = await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(createApplicantDto);
        const newApplicantBodyResult: ApplicantPresenter =
          newApplicantResult.body;

        // Act
        const result = await request(app.getHttpServer()).get(
          `/${version}/applicants`,
        );

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: ApplicantPresenter[] = result.body;
        expect(body[0].id).toBe(newApplicantBodyResult.id);
        expect(body[0].email).toBe(createApplicantDto.email);
      });
    });
    describe('PUT /applicants/:id', () => {
      it('should return 200 when update an applicant.', async () => {
        // Arrange
        const createApplicantDto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        const newApplicantResult = await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(createApplicantDto);
        const newApplicantBodyResult: ApplicantPresenter =
          newApplicantResult.body;

        // Act
        const id = newApplicantBodyResult.id;
        const dto: UpdateApplicantDto = {
          password: 'newPass123',
        };
        const result = await request(app.getHttpServer())
          .put(`/${version}/applicants/${id}`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toEqual({});
      });
    });
    describe('DELETE /applicants/:id', () => {});
  });

  describe('AuthController', () => {
    describe('POST /auth/login', () => {});
    describe('POST /auth/refresh-token', () => {});
    describe('POST /auth/recovery-password', () => {});
    describe('POST /auth/reset-password', () => {});
  });

  describe('CompanyController', () => {
    describe('POST /companies', () => {});
    describe('GET /companies/:id', () => {});
    describe('GET /companies', () => {});
    describe('PUT /companies/:id', () => {});
    describe('DELETE /companies/:id', () => {});
  });

  describe('AuthCompanyController', () => {
    describe('POST /auth-company/login', () => {});
    describe('POST /auth-company/refresh-token', () => {});
    describe('POST /auth-company/recovery-password', () => {});
    describe('POST /auth-company/reset-password', () => {});
  });

  describe('JobController', () => {
    describe('POST /jobs', () => {});
    describe('GET /jobs/:id', () => {});
    describe('GET /jobs', () => {});
    describe('PUT /jobs/:id', () => {});
    describe('DELETE /jobs/:id', () => {});
  });

  describe('ApplicationController', () => {
    describe('POST /applications', () => {});
    describe('GET /applications/:id', () => {});
    describe('GET /applications', () => {});
    describe('PUT /applications/:id', () => {});
    describe('DELETE /applications/:id', () => {});
  });
});
