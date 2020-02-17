import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { wardSocialStatusProviders } from './ward-social-status.providers';
import { WardSocialStatusService } from './ward-social-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [WardSocialStatusService, ...wardSocialStatusProviders],
  exports: [WardSocialStatusModule, WardSocialStatusService],
})
export class WardSocialStatusModule {}
