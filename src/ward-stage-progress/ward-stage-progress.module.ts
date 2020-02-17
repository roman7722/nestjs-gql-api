import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { wardStageProgressProviders } from './ward-stage-progress.providers';
import { WardStageProgressResolver } from './ward-stage-progress.resolver';
import { WardStageProgressService } from './ward-stage-progress.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    WardStageProgressService,
    WardStageProgressResolver,
    ...wardStageProgressProviders,
  ],
})
export class WardStageProgressModule {}
