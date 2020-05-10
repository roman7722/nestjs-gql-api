import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { userRoleProviders } from './user-role.providers';
import { UserRoleResolver } from './user-role.resolver';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [UserRoleService, UserRoleResolver, ...userRoleProviders],
  exports: [UserRoleModule],
})
export class UserRoleModule {}
