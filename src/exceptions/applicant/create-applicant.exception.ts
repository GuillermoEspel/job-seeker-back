import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateApplicantException extends HttpException {
  constructor() {
    super('Error creating applicant', HttpStatus.BAD_REQUEST);
  }
}
