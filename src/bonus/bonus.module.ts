import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { bonusProviders } from './bonus.providers';
import { BonusResolver } from './bonus.resolver';
import { BonusService } from './bonus.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [BonusService, BonusResolver, ...bonusProviders],
})
export class BonusModule {}
