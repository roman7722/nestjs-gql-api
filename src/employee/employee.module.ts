import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { EmployeeTypeJobModule } from '../employee-type-job/employee-type-job.module';
import { UserModule } from '../user/user.module';
import { employeeProviders } from './employee.providers';
import { EmployeeResolver } from './employee.resolver';
import { EmployeeService } from './employee.service';

@Module({
  imports: [DatabaseModule, UserModule, EmployeeTypeJobModule],
  providers: [EmployeeService, EmployeeResolver, ...employeeProviders],
})
export class EmployeeModule {}
