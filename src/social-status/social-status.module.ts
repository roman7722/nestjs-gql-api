import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { socialStatusProviders } from './social-status.providers';
import { SocialStatusResolver } from './social-status.resolver';
import { SocialStatusService } from './social-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [SocialStatusService, SocialStatusResolver, ...socialStatusProviders],
})
export class SocialStatusModule {}
