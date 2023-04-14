import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateCompanyException extends HttpException {
  constructor() {
    super('Error creating company', HttpStatus.BAD_REQUEST);
  }
}
