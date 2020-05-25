import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { serviceGuideProviders } from './service-guide.providers';
import { ServiceGuideResolver } from './service-guide.resolver';
import { ServiceGuideService } from './service-guide.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [ServiceGuideService, ServiceGuideResolver, ...serviceGuideProviders],
})
export class ServiceGuideModule {}
