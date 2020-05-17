import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { paymentStatusProviders } from './payment-status.providers';
import { PaymentStatusResolver } from './payment-status.resolver';
import { PaymentStatusService } from './payment-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    PaymentStatusService,
    PaymentStatusResolver,
    ...paymentStatusProviders,
  ],
})
export class PaymentStatusModule {}
