import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';
import { DatabaseError } from 'sequelize';
import { MessageCodeError } from '../lib/error/MessageCodeError';

@Catch()
export class DispatchError extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionWrapper = (response: Response, exception: any) => {
      if (response?.status) {
        return response.status(exception.message.statusCode).json({
          name: exception.name,
          message: exception.message,
          stack:
            process.env.NODE_ENV !== 'dev'
              ? exception.stack
              : 'N/A in this build',
        });
      } else {
        return process.env.NODE_ENV === 'dev' ? exception : 'N/A in this build';
      }
    };

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
        return exceptionWrapper(response, exception);

      default:
        if (response?.status) {
          return response.status(exception.httpStatus).json({ ...exception });
        } else {
          return exception;
        }
    }
  }
}
