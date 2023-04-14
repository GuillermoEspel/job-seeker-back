import { HttpException, HttpStatus } from '@nestjs/common';

export class UpdateJobByIdException extends HttpException {
  constructor() {
    super('Error updating job by id', HttpStatus.BAD_REQUEST);
  }
}
