import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SessionModule } from '../session/session.module';
import { userProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, SessionModule],
  providers: [UserService, UserResolver, ...userProviders],
  exports: [UserModule, UserService],
})
export class UserModule {}
