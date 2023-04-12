import { HttpException, HttpStatus } from '@nestjs/common';

export class GetUserByIdException extends HttpException {
  constructor() {
    super('Error getting user by id', HttpStatus.BAD_REQUEST);
  }
}
