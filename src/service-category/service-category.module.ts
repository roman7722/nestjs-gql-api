import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { serviceCategoryProviders } from './service-category.providers';
import { ServiceCategoryResolver } from './service-category.resolver';
import { ServiceCategoryService } from './service-category.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ServiceCategoryService,
    ServiceCategoryResolver,
    ...serviceCategoryProviders,
  ],
})
export class ServiceCategoryModule {}
