import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteApplicantByIdException extends HttpException {
  constructor() {
    super('Error deleting applicant by id', HttpStatus.BAD_REQUEST);
  }
}
