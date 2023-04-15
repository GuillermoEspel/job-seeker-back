import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateApplicationByIdException extends HttpException {
  constructor() {
    super('Error updating application by id', HttpStatus.BAD_REQUEST);
  }
}
