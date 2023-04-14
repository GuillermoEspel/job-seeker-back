import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateCompanyByIdException extends HttpException {
  constructor() {
    super('Error updating company by id', HttpStatus.BAD_REQUEST);
  }
}
