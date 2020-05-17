import { Module } from '@nestjs/common';
import { AgreementModule } from '../agreement/agreement.module';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { servicePackProviders } from './service-pack.providers';
import { ServicePackResolver } from './service-pack.resolver';
import { ServicePackService } from './service-pack.service';

@Module({
  imports: [DatabaseModule, UserModule, AgreementModule],
  providers: [ServicePackService, ServicePackResolver, ...servicePackProviders],
})
export class ServicePackModule {}
