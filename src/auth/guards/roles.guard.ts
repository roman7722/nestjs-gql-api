import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { decode } from 'jsonwebtoken';
import { TDecodedToken } from '../../token/token.types';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const rolesResolver =
      this.reflector.get<string[]>('roles', context.getClass()) || [];
    const rolesQuery =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const roles = [...rolesResolver, ...rolesQuery];

    console.log('Roles Allowed --->', roles);

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let payload: TDecodedToken;

    if (req?.headers?.authorization) {
      const accessToken: string = req.headers.authorization.split(' ')[1];
      payload = decode(accessToken) as TDecodedToken;
      if (typeof payload !== 'string' && payload) {
        const { sub, roleId } = payload;

        console.log('Token role --->', roleId);

        const hasRole = () => roles.some(role => role === roleId);

        return sub && hasRole();
      } else {
        return false;
      }
    }
  }
}
