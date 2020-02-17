import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { wardStageProviders } from './ward-stage.providers';
import { WardStageResolver } from './ward-stage.resolver';
import { WardStageService } from './ward-stage.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [WardStageService, WardStageResolver, ...wardStageProviders],
})
export class WardStageModule {}
