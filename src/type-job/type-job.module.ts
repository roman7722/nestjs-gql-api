import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { typeJobProviders } from './type-job.providers';
import { TypeJobResolver } from './type-job.resolver';
import { TypeJobService } from './type-job.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [TypeJobService, TypeJobResolver, ...typeJobProviders],
})
export class TypeJobModule {}
