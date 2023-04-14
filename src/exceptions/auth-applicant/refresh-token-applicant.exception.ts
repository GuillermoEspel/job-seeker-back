import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshTokenApplicantException extends HttpException {
  constructor() {
    super('Error in refresh token applicant', HttpStatus.BAD_REQUEST);
  }
}
