import { HttpException, HttpStatus } from '@nestjs/common';

export class DeleteJobByIdException extends HttpException {
  constructor() {
    super('Error deleting job by id', HttpStatus.BAD_REQUEST);
  }
}
