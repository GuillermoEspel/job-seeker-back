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
import {
  CreateApplicantDto,
  CreateCompanyDto,
  LoginCompanyDto,
  LoginDto,
  RefreshTokenCompanyDto,
  RefreshTokenDto,
  UpdateApplicantDto,
  UpdateCompanyDto,
} from '../src/dtos';
import {
  ApplicantPresenter,
  AuthTokensPresenter,
  CompanyPresenter,
} from '../src/presenters';

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
    describe('POST /auth/login', () => {
      it('should return 200 when login an applicant.', async () => {
        // Arrange
        const createApplicantDto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(createApplicantDto);

        // Act
        const dto: LoginDto = {
          email: createApplicantDto.email,
          password: createApplicantDto.password,
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/auth/login`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: AuthTokensPresenter = result.body;
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
      });
    });
    describe('POST /auth/refresh-token', () => {
      it('should return 200 when refresh token.', async () => {
        // Arrange
        const createApplicantDto: CreateApplicantDto = {
          email: 'test@example.com',
          password: 'pass1234',
        };
        await request(app.getHttpServer())
          .post(`/${version}/applicants`)
          .send(createApplicantDto);
        const loginDto: LoginDto = {
          email: createApplicantDto.email,
          password: createApplicantDto.password,
        };
        const loginResult = await request(app.getHttpServer())
          .post(`/${version}/auth/login`)
          .send(loginDto);
        const loginBodyResult: AuthTokensPresenter = loginResult.body;

        // Act
        const dto: RefreshTokenDto = {
          refreshToken: loginBodyResult.refreshToken,
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/auth/refresh-token`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: AuthTokensPresenter = result.body;
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
      });
    });
    describe('POST /auth/recovery-password', () => {});
    describe('POST /auth/reset-password', () => {});
  });

  describe('CompanyController', () => {
    describe('POST /companies', () => {
      it('should return 201 when create a company.', async () => {
        // Act
        const dto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(201);
        expect(result.body).toBeDefined();
        const body: CompanyPresenter = result.body;
        expect(body.id).toBeDefined();
        expect(body.email).toBe(dto.email);
        expect(body.name).toBe(dto.name);
        expect(body.logo).toBe(dto.logo);
      });
    });
    describe('GET /companies/:id', () => {
      it('should return 200 when return a company.', async () => {
        // Arrange
        const createCompanyDto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        const newCompanyResult = await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(createCompanyDto);
        const newCompanyBodyResult: CompanyPresenter = newCompanyResult.body;

        // Act
        const id = newCompanyBodyResult.id;
        const result = await request(app.getHttpServer()).get(
          `/${version}/companies/${id}`,
        );

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: CompanyPresenter = result.body;
        expect(body.id).toBe(id);
        expect(body.email).toBe(createCompanyDto.email);
        expect(body.name).toBe(createCompanyDto.name);
        expect(body.logo).toBe(createCompanyDto.logo);
      });
    });
    describe('GET /companies', () => {
      it('should return 200 when return a list of companies.', async () => {
        // Arrange
        const createCompanyDto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        const newCompanyResult = await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(createCompanyDto);
        const newCompanyBodyResult: CompanyPresenter = newCompanyResult.body;

        // Act
        const result = await request(app.getHttpServer()).get(
          `/${version}/companies`,
        );

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: CompanyPresenter[] = result.body;
        expect(body[0].id).toBe(newCompanyBodyResult.id);
        expect(body[0].email).toBe(newCompanyBodyResult.email);
        expect(body[0].name).toBe(newCompanyBodyResult.name);
        expect(body[0].logo).toBe(newCompanyBodyResult.logo);
      });
    });
    describe('PUT /companies/:id', () => {
      it('should return 200 when update a company.', async () => {
        // Arrange
        const createCompanyDto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        const newCompanyResult = await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(createCompanyDto);
        const newCompanyBodyResult: CompanyPresenter = newCompanyResult.body;

        // Act
        const id = newCompanyBodyResult.id;
        const dto: UpdateCompanyDto = {
          logo: 'newLogo.png',
        };
        const result = await request(app.getHttpServer())
          .put(`/${version}/companies/${id}`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toEqual({});
      });
    });
    describe('DELETE /companies/:id', () => {});
  });

  describe('AuthCompanyController', () => {
    describe('POST /auth-company/login', () => {
      it('should return 200 when login a company.', async () => {
        // Arrange
        const createCompanyDto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(createCompanyDto);

        // Act
        const dto: LoginCompanyDto = {
          email: createCompanyDto.email,
          password: createCompanyDto.password,
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/auth-company/login`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: AuthTokensPresenter = result.body;
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
      });
    });
    describe('POST /auth-company/refresh-token', () => {
      it('should return 200 when refresh token.', async () => {
        // Arrange
        const createCompanyDto: CreateCompanyDto = {
          email: 'test@example.com',
          password: 'pass1234',
          name: 'Company A',
          logo: 'logo.png',
        };
        await request(app.getHttpServer())
          .post(`/${version}/companies`)
          .send(createCompanyDto);
        const loginDto: LoginDto = {
          email: createCompanyDto.email,
          password: createCompanyDto.password,
        };
        const loginResult = await request(app.getHttpServer())
          .post(`/${version}/auth-company/login`)
          .send(loginDto);
        const loginBodyResult: AuthTokensPresenter = loginResult.body;

        // Act
        const dto: RefreshTokenCompanyDto = {
          refreshToken: loginBodyResult.refreshToken,
        };
        const result = await request(app.getHttpServer())
          .post(`/${version}/auth-company/refresh-token`)
          .send(dto);

        // Assert
        expect(result).toBeDefined();
        expect(result.status).toBe(200);
        expect(result.body).toBeDefined();
        const body: AuthTokensPresenter = result.body;
        expect(body.token).toBeDefined();
        expect(body.refreshToken).toBeDefined();
      });
    });
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
