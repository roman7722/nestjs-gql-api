import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { quarterProviders } from './quarter.providers';
import { QuarterResolver } from './quarter.resolver';
import { QuarterService } from './quarter.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [QuarterService, QuarterResolver, ...quarterProviders],
})
export class QuarterModule {}
