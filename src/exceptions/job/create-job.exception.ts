import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateJobException extends HttpException {
  constructor() {
    super('Error creating job', HttpStatus.BAD_REQUEST);
  }
}
