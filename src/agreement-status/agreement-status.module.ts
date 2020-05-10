import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { agreementStatusProviders } from './agreement-status.providers';
import { AgreementStatusResolver } from './agreement-status.resolver';
import { AgreementStatusService } from './agreement-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    AgreementStatusService,
    AgreementStatusResolver,
    ...agreementStatusProviders,
  ],
})
export class AgreementStatusModule {}
