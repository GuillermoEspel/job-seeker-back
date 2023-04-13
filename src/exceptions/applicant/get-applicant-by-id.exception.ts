import { HttpException, HttpStatus } from '@nestjs/common';

export class GetApplicantByIdException extends HttpException {
  constructor() {
    super('Error getting applicant by id', HttpStatus.BAD_REQUEST);
  }
}
