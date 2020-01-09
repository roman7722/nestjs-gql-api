import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';

export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before...');
    return next.handle().pipe(
      tap(() => {
        console.log('After...');
      }),
    );
  }
}
