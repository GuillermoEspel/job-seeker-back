import { HttpException, HttpStatus } from '@nestjs/common';

export class GetCompaniesException extends HttpException {
  constructor() {
    super('Error getting companies', HttpStatus.BAD_REQUEST);
  }
}
