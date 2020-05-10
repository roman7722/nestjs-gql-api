import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { employeeTypeJobProviders } from './employee-type-job.providers';
import { EmployeeTypeJobService } from './employee-type-job.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [EmployeeTypeJobService, ...employeeTypeJobProviders],
  exports: [EmployeeTypeJobModule, EmployeeTypeJobService],
})
export class EmployeeTypeJobModule {}
