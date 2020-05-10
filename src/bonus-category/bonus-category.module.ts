import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { bonusCategoryProviders } from './bonus-category.providers';
import { BonusCategoryResolver } from './bonus-category.resolver';
import { BonusCategoryService } from './bonus-category.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    BonusCategoryService,
    BonusCategoryResolver,
    ...bonusCategoryProviders,
  ],
})
export class BonusCategoryModule {}
