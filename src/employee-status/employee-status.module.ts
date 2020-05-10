import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { employeeStatusProviders } from './employee-status.providers';
import { EmployeeStatusResolver } from './employee-status.resolver';
import { EmployeeStatusService } from './employee-status.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    EmployeeStatusService,
    EmployeeStatusResolver,
    ...employeeStatusProviders,
  ],
})
export class EmployeeStatusModule {}
