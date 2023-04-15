import { Injectable, Logger } from '@nestjs/common';
import { ApplicationEntity } from '../entities';
import {
  CreateApplicationDto,
  GetApplicationsDto,
  UpdateApplicationDto,
} from '../dtos';
import {
  ApplicantRepository,
  ApplicationRepository,
  JobRepository,
} from '../repositories';
import { ApplicationStatus } from '../enums';
import {
  CreateApplicationException,
  DeleteApplicationByIdException,
  GetApplicationByIdException,
  GetApplicationsException,
  UpdateApplicationByIdException,
} from '../exceptions';

@Injectable()
export class ApplicationService {
  constructor(
    private applicationRepository: ApplicationRepository,
    private applicantRepository: ApplicantRepository,
    private jobRepository: JobRepository,
  ) {}

  async createApplication(
    dto: CreateApplicationDto,
  ): Promise<ApplicationEntity> {
    try {
      const { applicantId, jobId } = dto;
      const applicant = await this.applicantRepository.getById(applicantId);
      if (!applicant) throw new Error('Applicant not found.');

      const job = await this.jobRepository.getById(jobId);
      if (!job) throw new Error('Job not found.');

      const newApplicationId = await this.applicationRepository.create({
        applicantId,
        jobId,
        status: ApplicationStatus.PENDING,
      });
      const newApplication = await this.applicationRepository.getById(
        newApplicationId,
      );
      return newApplication;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateApplicationException();
    }
  }

  async getApplicationById(id: string): Promise<ApplicationEntity> {
    try {
      const application = await this.applicationRepository.getById(id);
      if (!application) throw new Error('Application not found.');
      return application;
    } catch (error) {
      Logger.error(error.message);
      throw new GetApplicationByIdException();
    }
  }

  async getApplications(dto: GetApplicationsDto): Promise<ApplicationEntity[]> {
    try {
      const applications = await this.applicationRepository.getAll();
      return applications;
    } catch (error) {
      Logger.error(error.message);
      throw new GetApplicationsException();
    }
  }

  async updateApplicationById(
    id: string,
    dto: UpdateApplicationDto,
  ): Promise<void> {
    try {
      const application = await this.applicationRepository.getById(id);
      if (!application) throw new Error('Application not found.');

      await this.applicationRepository.updateById(id, {
        status: dto.status,
      });
    } catch (error) {
      Logger.error(error.message);
      throw new UpdateApplicationByIdException();
    }
  }

  async deleteApplicationById(id: string): Promise<void> {
    // TODO: Implement
  }
}
