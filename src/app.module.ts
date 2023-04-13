import { Module } from '@nestjs/common';
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
} from './services';

@Module({
  imports: [EnvironmentConfigModule, MongoDatabaseModule, RepositoriesModule],
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
    HealthService,
    JobService,
  ],
})
export class AppModule {}
