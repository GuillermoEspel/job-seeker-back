import { Injectable } from '@nestjs/common';
import { ApplicationEntity } from '../entities';
import {
  CreateApplicationDto,
  GetApplicationsDto,
  UpdateApplicationDto,
} from '../dtos';
import { ApplicationStatus } from '../enums';

@Injectable()
export class ApplicationService {
  async createApplication(dto: CreateApplicationDto): Promise<string> {
    // TODO: Implement
    return 'uuid';
  }

  async getApplicationById(id: string): Promise<ApplicationEntity> {
    // TODO: Implement
    return {
      id: '63d2e28f18828f9cc35369aa',
      jobId: '63d2e28f18828f9cc35369ab',
      applicantId: '63d2e28f18828f9cc35369ac',
      status: ApplicationStatus.IN_PROGRESS,
    };
  }

  async getApplications(dto: GetApplicationsDto): Promise<ApplicationEntity[]> {
    // TODO: Implement
    return [
      {
        id: '63d2e28f18828f9cc35369aa',
        jobId: '63d2e28f18828f9cc35369ab',
        applicantId: '63d2e28f18828f9cc35369ac',
        status: ApplicationStatus.IN_PROGRESS,
      },
    ];
  }

  async updateApplicationById(
    id: string,
    dto: UpdateApplicationDto,
  ): Promise<void> {
    // TODO: Implement
  }

  async deleteApplicationById(id: string): Promise<void> {
    // TODO: Implement
  }
}
