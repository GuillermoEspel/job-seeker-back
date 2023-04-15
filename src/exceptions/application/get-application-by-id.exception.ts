import { HttpException, HttpStatus } from '@nestjs/common';

export class GetApplicationByIdException extends HttpException {
  constructor() {
    super('Error getting application by id', HttpStatus.BAD_REQUEST);
  }
}
