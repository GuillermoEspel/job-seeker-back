import { HttpException, HttpStatus } from '@nestjs/common';

export class DtoException extends HttpException {
  constructor(details: any) {
    super(
      {
        message: 'Error in DTO.',
        status: HttpStatus.BAD_REQUEST,
        details,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
