import { HttpException, HttpStatus } from '@nestjs/common';

export class GetCompanyByIdException extends HttpException {
  constructor() {
    super('Error getting company by id', HttpStatus.BAD_REQUEST);
  }
}
