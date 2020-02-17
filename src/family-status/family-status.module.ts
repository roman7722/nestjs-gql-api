import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { familyStatusProviders } from './family-status.providers';
import { FamilyStatusResolver } from './family-status.resolver';
import { FamilyStatusService } from './family-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    FamilyStatusService,
    FamilyStatusResolver,
    ...familyStatusProviders,
  ],
})
export class FamilyStatusModule {}
