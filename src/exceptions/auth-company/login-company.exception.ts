import { HttpException, HttpStatus } from '@nestjs/common';

export class LoginCompanyException extends HttpException {
  constructor() {
    super('Error login company', HttpStatus.BAD_REQUEST);
  }
}
