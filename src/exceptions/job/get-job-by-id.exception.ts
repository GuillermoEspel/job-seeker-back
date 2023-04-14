import { HttpException, HttpStatus } from '@nestjs/common';

export class GetJobByIdException extends HttpException {
  constructor() {
    super('Error getting job by id', HttpStatus.BAD_REQUEST);
  }
}
