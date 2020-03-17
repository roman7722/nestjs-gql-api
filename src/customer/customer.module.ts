import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { customerProviders } from './customer.providers';
import { CustomerResolver } from './customer.resolver';
import { CustomerService } from './customer.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [CustomerService, CustomerResolver, ...customerProviders],
})
export class CustomerModule {}
