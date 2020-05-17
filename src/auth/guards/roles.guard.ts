import chalk from 'chalk';
import dateFormat from 'dateformat';
import { decode } from 'jsonwebtoken';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { TDecodedToken } from '../../session/session.types';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const rolesResolver =
      this.reflector.get<string[]>('roles', context.getClass()) || [];
    const rolesQuery =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];
    const roles = [...rolesResolver, ...rolesQuery];

    const now = new Date();

    console.log(
      chalk.bgRedBright.whiteBright.bold('\n\n START QUERY '),
      chalk.bgWhiteBright.redBright.bold(
        ' ',
        dateFormat(now, 'default'),
        ' \n',
      ),
      chalk.yellow('\nRoles Allowed: '),
      chalk.red(roles),
      '\n',
    );

    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    let payload: TDecodedToken;

    if (req?.headers?.authorization) {
      const accessToken: string = req.headers.authorization.split(' ')[1];
      payload = decode(accessToken) as TDecodedToken;
      if (typeof payload !== 'string' && payload) {
        const { sub } = payload;
        /** Получаем userRoleName из таблицы s_user */
        const user = await this.userService.userRoleFind(sub);
        const userRoleName = user?.getDataValue('userRoleName');

        console.log(
          chalk.yellow('\nUser role: '),
          chalk.red(userRoleName),
          '\n',
        );

        const hasRole = () => roles.some((role) => role === userRoleName);

        return sub && hasRole();
      } else {
        return false;
      }
    }
  }
}
