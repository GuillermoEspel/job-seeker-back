import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvironmentConfigModule } from './config/environment-config.module';
import {
  ApplicantController,
  ApplicationController,
  AuthCompanyController,
  AuthController,
  CompanyController,
  HealthController,
  JobController,
} from './controllers';
import { MongoDatabaseModule } from './database';
import { RepositoriesModule } from './repositories';
import {
  ApplicationService,
  AuthCompanyService,
  AuthService,
  CompanyService,
  HealthService,
  JobService,
  ApplicantService,
  HashService,
  JWTApplicantService,
  JWTCompanyPanyService,
} from './services';

@Module({
  imports: [
    EnvironmentConfigModule,
    JwtModule.register({}),
    MongoDatabaseModule,
    RepositoriesModule,
  ],
  controllers: [
    ApplicantController,
    ApplicationController,
    AuthCompanyController,
    AuthController,
    CompanyController,
    HealthController,
    JobController,
  ],
  providers: [
    ApplicantService,
    ApplicationService,
    AuthCompanyService,
    AuthService,
    CompanyService,
    HashService,
    HealthService,
    JWTApplicantService,
    JWTCompanyPanyService,
    JobService,
  ],
})
export class AppModule {}
