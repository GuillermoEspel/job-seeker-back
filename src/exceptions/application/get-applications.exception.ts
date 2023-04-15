import { HttpException, HttpStatus } from '@nestjs/common';

export class GetApplicationsException extends HttpException {
  constructor() {
    super('Error getting applications', HttpStatus.BAD_REQUEST);
  }
}
