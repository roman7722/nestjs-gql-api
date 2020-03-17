import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { paymentFormProviders } from './payment-form.providers';
import { PaymentFormResolver } from './payment-form.resolver';
import { PaymentFormService } from './payment-form.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [PaymentFormService, PaymentFormResolver, ...paymentFormProviders],
})
export class PaymentFormModule {}
