import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { executionStatusProviders } from './execution-status.providers';
import { ExecutionStatusResolver } from './execution-status.resolver';
import { ExecutionStatusService } from './execution-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    ExecutionStatusService,
    ExecutionStatusResolver,
    ...executionStatusProviders,
  ],
})
export class ExecutionStatusModule {}
