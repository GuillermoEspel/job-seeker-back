import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantModelDefinition } from '../database';
import { ApplicantRepository } from './applicant.repository';

@Module({
  imports: [MongooseModule.forFeature([ApplicantModelDefinition])],
  providers: [ApplicantRepository],
  exports: [ApplicantRepository],
})
export class RepositoriesModule {}
