import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { cityProviders } from './city.providers';
import { CityResolver } from './city.resolver';
import { CityService } from './city.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [CityService, CityResolver, ...cityProviders],
})
export class CityModule {}
