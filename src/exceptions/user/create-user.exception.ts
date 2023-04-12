import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateUserException extends HttpException {
  constructor() {
    super('Error creating user', HttpStatus.BAD_REQUEST);
  }
}
