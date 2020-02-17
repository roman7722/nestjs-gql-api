import { GraphQLError } from 'graphql/error/GraphQLError';
import { OptimisticLockError } from 'sequelize';
import { BadRequestException, ForbiddenException } from '@nestjs/common';
import { MessageCodeError } from '../../common/error/MessageCodeError';

export const graphqlError = (error: GraphQLError) => {
  // console.log('error.originalError --->', error.originalError);

  /** Error 400 */
  if (error.originalError instanceof BadRequestException) {
    return new BadRequestException('BadRequestException');
  }
  /** Error 403 */
  if (error.originalError instanceof ForbiddenException) {
    return error?.originalError.message;
  }
  /** JsonWebTokenError */
  if (
    error.message.startsWith('JsonWebTokenError') ||
    error.message.startsWith('invalid token') ||
    error.message.startsWith('Unexpected token') ||
    error.message.startsWith('invalid signature')
  ) {
    return new BadRequestException('JsonWebTokenError');
  }
  /** AuthenticationError */
  if (error.message.startsWith('AuthenticationError')) {
    return new BadRequestException('AuthenticationError');
  }
  /** MessageCodeError */
  if (error.originalError instanceof MessageCodeError) {
    return error?.extensions?.exception;
  }
  /** OptimisticLockError */
  if (error.originalError instanceof OptimisticLockError) {
    return new OptimisticLockError({ message: 'OptimisticLockError' });
  }
};
