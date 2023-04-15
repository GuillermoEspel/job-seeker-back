import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteApplicationByIdException extends HttpException {
  constructor() {
    super('Error deleting application by id', HttpStatus.BAD_REQUEST);
  }
}
