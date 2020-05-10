import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { operationModeProviders } from './operation-mode.providers';
import { OperationModeResolver } from './operation-mode.resolver';
import { OperationModeService } from './operation-mode.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    OperationModeService,
    OperationModeResolver,
    ...operationModeProviders,
  ],
})
export class OperationModeModule {}
