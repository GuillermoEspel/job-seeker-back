import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export interface IErrorResponseData {
  statusCode: number;
  message: string;
  details: string | string[];
  timestamp: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // Catch HttpException
    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();
      const res = exception.getResponse();
      const details = (res as any)?.details ?? [];
      const errorResponseData: IErrorResponseData = {
        statusCode,
        message: exception.message,
        details,
        timestamp: new Date().toISOString(),
      };
      return response.status(statusCode).json(errorResponseData);
    }

    // Catch Error
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal Server Error';
    const errorResponseData: IErrorResponseData = {
      statusCode,
      message,
      details: [],
      timestamp: new Date().toISOString(),
    };
    response.status(statusCode).json(errorResponseData);
  }
}
