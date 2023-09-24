import { ValidationError } from '@nestjs/class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  type = 'ValidationException'; // Add this line

  constructor(message: string, validationErrors: ValidationError[]) {
    super(
      {
        message,
        validationErrors,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
