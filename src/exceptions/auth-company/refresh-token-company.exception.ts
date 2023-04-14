import { HttpException, HttpStatus } from '@nestjs/common';

export class RefreshTokenCompanyException extends HttpException {
  constructor() {
    super('Error in refresh token company', HttpStatus.BAD_REQUEST);
  }
}
