import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { customerCategoryProviders } from './customer-category.providers';
import { CustomerCategoryResolver } from './customer-category.resolver';
import { CustomerCategoryService } from './customer-category.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    CustomerCategoryService,
    CustomerCategoryResolver,
    ...customerCategoryProviders,
  ],
})
export class CustomerCategoryModule {}
