import { ValidationError } from '@nestjs/class-validator';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  CannotCreateEntityIdMapError,
  EntityNotFoundError,
  QueryFailedError,
} from 'typeorm';
import { ValidationException } from '../Exceptions/validation-body.exception';

export const GlobalResponseError: (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
) => IResponseError = (
  statusCode: number,
  message: string,
  code: string,
  request: Request,
): IResponseError => {
  return {
    statusCode: statusCode,
    message,
    code,
    timestamp: new Date().toISOString(),
    path: request.url,
    method: request.method,
  };
};

export interface IResponseError {
  statusCode: number;
  message: string;
  code: string;
  timestamp: string;
  path: string;
  method: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionAsAny = exception as any;
    exceptionAsAny.message =
      exceptionAsAny?.message?.message || exceptionAsAny?.message;

    let code = 'HttpException';

    Logger.error(
      exceptionAsAny.message,
      exceptionAsAny.stack,
      `${request.method} ${request.url}`,
    );
    let message = exceptionAsAny.message;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;

    switch (exception.constructor) {
      case HttpException:
        status = (exception as HttpException).getStatus();
        break;
      case ValidationError:
        status = (exception as HttpException).getStatus();
        message = (exception as ValidationError).toString();
        break;
      case QueryFailedError: // this is a TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as QueryFailedError).message;
        code = exceptionAsAny.code;
        break;
      case EntityNotFoundError: // this is another TypeOrm error
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        code = exceptionAsAny.code;
        break;
      case CannotCreateEntityIdMapError: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as CannotCreateEntityIdMapError).message;
        code = exceptionAsAny.code;
        break;
      case ValidationException: // and another
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as ValidationException).message;
        code = exceptionAsAny.code;
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exceptionAsAny?.[0]?.target) {
          message = exceptionAsAny;
        }
    }

    response
      .status(status)
      .json(GlobalResponseError(status, message, code, request));
  }
}
