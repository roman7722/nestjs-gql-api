import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DispatchError } from './common/filters/DispatchError';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalFilters(new DispatchError());
  await app.listen(3005);
}

bootstrap();
