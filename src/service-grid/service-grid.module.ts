import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { serviceGridProviders } from './service-grid.providers';
import { ServiceGridResolver } from './service-grid.resolver';
import { ServiceGridService } from './service-grid.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ServiceGridService, ServiceGridResolver, ...serviceGridProviders],
})
export class ServiceGridModule {}
