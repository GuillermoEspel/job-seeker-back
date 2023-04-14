import { HttpException, HttpStatus } from '@nestjs/common';

export class GetApplicantsException extends HttpException {
  constructor() {
    super('Error getting applicants', HttpStatus.BAD_REQUEST);
  }
}
