import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { districtProviders } from './district.providers';
import { DistrictResolver } from './district.resolver';
import { DistrictService } from './district.service';

@Module({
  imports: [DatabaseModule],
  providers: [DistrictService, DistrictResolver, ...districtProviders],
})
export class DistrictModule {}
