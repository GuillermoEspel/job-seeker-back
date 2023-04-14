import { HttpException, HttpStatus } from '@nestjs/common';

export class GetJobsException extends HttpException {
  constructor() {
    super('Error getting jobs', HttpStatus.BAD_REQUEST);
  }
}
