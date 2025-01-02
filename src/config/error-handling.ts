import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';

import { Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class ErrorHandler implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		console.log('exception', <any>exception);
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		let errName: string;
		let message: string | string[];
		let errCode: string;
		let statusCode: number;

		if (exception instanceof HttpException) {
			statusCode = exception.getStatus();
			errName = exception.name;
			const exceptionResponse = exception.getResponse();
			if (exception instanceof BadRequestException && Array.isArray(exceptionResponse['message'])) {
				statusCode = HttpStatus.BAD_REQUEST;
				errName = 'ValidationError';
				message = exceptionResponse['message'];
			} else {
				message = exceptionResponse['message'] || exception.message;
			}
		} else if (exception instanceof QueryFailedError) {
			if (exception.message.includes('duplicate key value')) {
				statusCode = HttpStatus.BAD_REQUEST;
			} else {
				statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
			}

			errName = exception.name;
			message = exception['detail'];
			errCode = exception['code'];
		} else if (exception instanceof TokenExpiredError) {
			statusCode = HttpStatus.UNAUTHORIZED;
			errName = exception.name;
			message = exception.message;
		} else {
			statusCode = exception.getStatus?.() || HttpStatus.INTERNAL_SERVER_ERROR;
			errName = exception.name;
			message = exception.message;
		}

		return response.status(statusCode).json({
			statusCode,
			errName,
			errCode,
			message,
			timeStamp: new Date().toISOString(),
		});
	}
}
