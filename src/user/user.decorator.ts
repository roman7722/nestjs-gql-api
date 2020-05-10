/** --------- For old version NestJS 6.11.1 --------- */
// import { createParamDecorator } from '@nestjs/common';

// export const CurrentUser = createParamDecorator(
//   (data, [root, args, ctx, info]) => ctx.req.user,
// );


/** --------- For new version NestJS 7.0.9 --------- */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
