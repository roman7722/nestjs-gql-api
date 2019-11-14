import { Response } from 'express';
import { DatabaseError } from 'sequelize';
import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MessageCodeError } from '../lib/error/MessageCodeError';

@Catch()
export class DispatchError extends BaseExceptionFilter {

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (true) {

      case exception instanceof MessageCodeError:
        if (response?.status) {
          return response.status(exception.httpStatus).json({ ...exception });
        } else {
          return exception;
        }

      case exception instanceof DatabaseError:
        if (process.env.NODE_ENV === 'dev') {
          return new DatabaseError(exception.parent);
        } else {
          throw new Error('prod:DatabaseError');
        }

      case exception instanceof HttpException:
        return response.status(HttpStatus.BAD_REQUEST).json({
          name: exception.name,
          message: exception.message,
          stack: exception.stack,
        });

      default:
        return exception;
    }
  }
}
