import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../enums';
import { ApplicationEntity } from '../entities';

const applicationPresenterExample: ApplicationPresenter = {
  id: '63d2e28f18828f9cc35369aa',
  jobId: '63d2e28f18828f9cc35369ab',
  applicantId: '63d2e28f18828f9cc35369ac',
  status: ApplicationStatus.IN_PROGRESS,
};

export class ApplicationPresenter {
  @ApiProperty({
    description: 'Application ID.',
    example: applicationPresenterExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Job ID.',
    example: applicationPresenterExample.jobId,
  })
  jobId: string;

  @ApiProperty({
    description: 'Applicant ID.',
    example: applicationPresenterExample.applicantId,
  })
  applicantId: string;

  @ApiProperty({
    description: 'Application status.',
    example: applicationPresenterExample.status,
  })
  status: ApplicationStatus;

  constructor(application: ApplicationEntity) {
    this.id = application.id;
    this.jobId = application.jobId;
    this.applicantId = application.applicantId;
    this.status = application.status;
  }
}
