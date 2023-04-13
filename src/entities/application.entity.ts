import { ApplicationStatus } from '../enums';

export class ApplicationEntity {
  id: string;
  jobId: string;
  applicantId: string;
  status: ApplicationStatus;
}
