import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateApplicationException extends HttpException {
  constructor() {
    super('Error creating application', HttpStatus.BAD_REQUEST);
  }
}
