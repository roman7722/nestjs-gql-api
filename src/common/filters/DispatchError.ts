import { AuthenticationError } from 'apollo-server-core';
import { Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { DatabaseError } from 'sequelize';
import { ArgumentsHost, BadRequestException, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { MessageCodeError } from '../lib/error/MessageCodeError';

@Catch()
export class DispatchError extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const exceptionWrapper = (response: Response, exception: any) => {
      if (response?.status) {
        return response.status(exception.message.statusCode).json({
          message: exception.message,
          stack:
            process.env.NODE_ENV === 'develop'
              ? exception.stack
              : 'N/A in this build',
        });
      } else {
        return process.env.NODE_ENV === 'develop'
          ? exception
          : 'N/A in this build';
      }
    };

    // console.log(exception);

    switch (true) {
      case exception instanceof MessageCodeError:
        if (response?.status) {
          return response.status(exception.httpStatus).json({ ...exception });
        } else {
          return exception;
        }

      case exception instanceof DatabaseError:
        if (process.env.NODE_ENV === 'develop') {
          return new DatabaseError(exception.parent);
        } else {
          throw new Error('prod:DatabaseError');
        }

      // Error 403
      // case exception instanceof ForbiddenException:
      // return exceptionWrapper(response, exception);

      // Error 404
      // case exception instanceof NotFoundException:
      // return exceptionWrapper(response, exception);

      case exception instanceof JsonWebTokenError:
        return new JsonWebTokenError('JsonWebTokenError');

      case exception instanceof AuthenticationError:
        return new AuthenticationError('AuthenticationError');

      case exception instanceof HttpException:
        return exceptionWrapper(response, exception);

      default:
        console.log('DispatchError default ---->\n');
        if (response?.status) {
          console.log('if ---->\n');
          return response.status(exception.httpStatus).json({ ...exception });
        } else {
          console.log('else ---->\n', exception);
          return new BadRequestException();
        }
    }
  }
}
