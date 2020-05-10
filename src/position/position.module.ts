import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { positionProviders } from './position.providers';
import { PositionResolver } from './position.resolver';
import { PositionService } from './position.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [PositionService, PositionResolver, ...positionProviders],
})
export class PositionModule {}
