import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { TokenModule } from '../token/token.module';
import { userProviders } from './user.providers';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, TokenModule],
  providers: [UserService, UserResolver, ...userProviders],
  exports: [UserModule, UserService],
})
export class UserModule {}
