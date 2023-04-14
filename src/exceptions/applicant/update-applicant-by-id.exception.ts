import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateApplicantByIdException extends HttpException {
  constructor() {
    super('Error updating applicant by id', HttpStatus.BAD_REQUEST);
  }
}
