import { ApiProperty } from '@nestjs/swagger';
import { ApplicantEntity } from '../entities';

const applicantPresenterExample: ApplicantPresenter = {
  id: '63d2e28f18828f9cc35369aa',
  email: 'albert@gmail.com',
};

export class ApplicantPresenter {
  @ApiProperty({
    description: 'Applicant ID.',
    example: applicantPresenterExample.id,
  })
  id: string;

  @ApiProperty({
    description: 'Applicant email.',
    example: applicantPresenterExample.email,
  })
  email: string;

  constructor(applicant: ApplicantEntity) {
    this.id = applicant.id;
    this.email = applicant.email;
  }
}
