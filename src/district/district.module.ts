import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { districtProviders } from './district.providers';
import { DistrictResolver } from './district.resolver';
import { DistrictService } from './district.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [DistrictService, DistrictResolver, ...districtProviders],
})
export class DistrictModule {}
