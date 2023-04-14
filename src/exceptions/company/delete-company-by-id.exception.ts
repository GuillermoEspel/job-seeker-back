import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteCompanyByIdException extends HttpException {
  constructor() {
    super('Error deleting company by id', HttpStatus.BAD_REQUEST);
  }
}
