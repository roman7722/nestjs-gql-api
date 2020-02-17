import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { sessionProviders } from './session.providers';
import { SessionResolver } from './session.resolver';
import { SessionService } from './session.service';

@Module({
  imports: [DatabaseModule],
  providers: [SessionService, SessionResolver, ...sessionProviders],
  exports: [SessionModule, SessionService],
})
export class SessionModule {}
