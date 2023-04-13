import { Injectable } from '@nestjs/common';
import { JobEntity } from '../entities';
import { CreateJobDto, GetJobsDto, UpdateJobDto } from '../dtos';

@Injectable()
export class JobService {
  async createJob(dto: CreateJobDto): Promise<string> {
    // TODO: Implement
    return 'uuid';
  }

  async getJobById(id: string): Promise<JobEntity> {
    // TODO: Implement
    return {
      id: 'uuid',
      title: 'Title A',
      description: 'Description A',
    };
  }

  async getJobs(dto: GetJobsDto): Promise<JobEntity[]> {
    // TODO: Implement
    return [
      {
        id: 'uuid',
        title: 'Title A',
        description: 'Description A',
      },
    ];
  }

  async updateJobById(id: string, dto: UpdateJobDto): Promise<void> {
    // TODO: Implement
  }

  async deleteJobById(id: string): Promise<void> {
    // TODO: Implement
  }
}
