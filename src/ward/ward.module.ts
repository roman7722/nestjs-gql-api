import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { WardSocialStatusModule } from '../ward-social-status/ward-social-status.module';
import { wardProviders } from './ward.providers';
import { WardResolver } from './ward.resolver';
import { WardService } from './ward.service';

@Module({
  imports: [DatabaseModule, UserModule, WardSocialStatusModule],
  providers: [WardService, WardResolver, ...wardProviders],
})
export class WardModule {}
