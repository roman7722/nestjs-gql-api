import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filters/DispatchError';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { StringTrimPipe } from './common/pipes/string-trim.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app
    .useGlobalInterceptors(new TransformInterceptor())
    .useGlobalPipes(new StringTrimPipe())
    .useGlobalFilters(new DispatchError())
    .listen(3005);
}

bootstrap();
