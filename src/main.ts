import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filters/DispatchError';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalFilters(new DispatchError())
    .listen(3005);
}

bootstrap();
