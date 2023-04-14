import { Injectable, Logger } from '@nestjs/common';
import { JobEntity } from '../entities';
import { CreateJobDto, GetJobsDto, UpdateJobDto } from '../dtos';
import { CompanyRepository, JobRepository } from '../repositories';
import {
  CreateJobException,
  DeleteJobByIdException,
  GetCompanyByIdException,
  GetJobsException,
  UpdateJobByIdException,
} from '../exceptions';

@Injectable()
export class JobService {
  constructor(
    private companyRepository: CompanyRepository,
    private jobRepository: JobRepository,
  ) {}

  async createJob(dto: CreateJobDto): Promise<JobEntity> {
    try {
      const { companyId } = dto;
      const company = await this.companyRepository.getById(companyId);
      if (!company) throw new Error('Company not found.');

      const newJobId = await this.jobRepository.create({
        title: dto.title,
        description: dto.description,
        companyId,
      });
      const newJob = await this.jobRepository.getById(newJobId);
      return newJob;
    } catch (error) {
      Logger.error(error.message);
      throw new CreateJobException();
    }
  }

  async getJobById(id: string): Promise<JobEntity> {
    try {
      const job = await this.jobRepository.getById(id);
      if (!job) throw new Error('Job not found.');
      return job;
    } catch (error) {
      Logger.error(error.message);
      throw new GetCompanyByIdException();
    }
  }

  async getJobs(dto: GetJobsDto): Promise<JobEntity[]> {
    try {
      const jobs = await this.jobRepository.getAll();
      return jobs;
    } catch (error) {
      Logger.error(error.message);
      throw new GetJobsException();
    }
  }

  async updateJobById(id: string, dto: UpdateJobDto): Promise<void> {
    try {
      const job = await this.jobRepository.getById(id);
      if (!job) throw new Error('Job not found.');

      await this.jobRepository.updateById(id, {
        description: dto.description,
      });
    } catch (error) {
      Logger.error(error.message);
      throw new UpdateJobByIdException();
    }
  }

  async deleteJobById(id: string): Promise<void> {
    try {
      // TODO: Implement
    } catch (error) {
      Logger.error(error.message);
      throw new DeleteJobByIdException();
    }
  }
}
