import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { userRoleProviders } from './user-role.providers';
import { UserRoleResolver } from './user-role.resolver';
import { UserRoleService } from './user-role.service';

@Module({
  imports: [DatabaseModule],
  providers: [UserRoleService, UserRoleResolver, ...userRoleProviders],
})
export class UserRoleModule {}
