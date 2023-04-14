import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ApplicantModelDefinition,
  ApplicationModelDefinition,
  CompanyModelDefinition,
  JobModelDefinition,
} from '../database';
import { ApplicantRepository } from './applicant.repository';
import { ApplicationRepository } from './application.repository';
import { CompanyRepository } from './company.repository';
import { JobRepository } from './job.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      ApplicantModelDefinition,
      ApplicationModelDefinition,
      CompanyModelDefinition,
      JobModelDefinition,
    ]),
  ],
  providers: [
    ApplicantRepository,
    ApplicationRepository,
    CompanyRepository,
    JobRepository,
  ],
  exports: [
    ApplicantRepository,
    ApplicationRepository,
    CompanyRepository,
    JobRepository,
  ],
})
export class RepositoriesModule {}
