import { AuthenticationError } from 'apollo-server-core';
import { TokenExpiredError, verify } from 'jsonwebtoken';
import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { TVerifyedToken } from '../../session/session.types';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    if (req?.headers?.authorization) {
      const accessToken: string = req.headers.authorization.split(' ')[1];
      const payload: TVerifyedToken = verify(
        accessToken,
        process.env.JWT_SECRET,
        {
          algorithms: ['HS256'],
        },
      ) as TVerifyedToken;

      if (typeof payload !== 'string' && payload) {
        return super.canActivate(new ExecutionContextHost([req]));
      }
    } else {
      throw new BadRequestException();
    }
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      if (info.name === 'TokenExpiredError') {
        throw new TokenExpiredError(info.name, info.expiredAt);
      }
      throw err || new AuthenticationError('GqlAuthGuard');
    }
    return user;
  }
}
