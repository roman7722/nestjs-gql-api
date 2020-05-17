import chalk from 'chalk';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log(
      chalk.green('[GLOBAL INTERCEPTORS] [TransformInterceptor] [Before]'),
    );

    return next.handle().pipe(
      tap(() => {
        console.log(
          chalk.green('\n[GLOBAL INTERCEPTORS] [TransformInterceptor] [After]'),
        );
      }),
    );
  }
}
