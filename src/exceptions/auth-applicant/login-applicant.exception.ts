import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginApplicantException extends HttpException {
  constructor() {
    super('Error login applicant', HttpStatus.BAD_REQUEST);
  }
}
