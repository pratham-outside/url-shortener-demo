import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError, HttpException)
export class ErrorHandler<T extends HttpException | TypeORMError>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    // const request = ctx.getRequest<Request>();
    console.log(exception.name, 'here');
    const name = exception.name;
    const message = exception.message;
    const errorDetails = {
      name,
      message,
    };

    response.json(errorDetails);
  }
}
