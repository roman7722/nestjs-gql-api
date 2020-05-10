import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { employeePositionProviders } from './employee-position.providers';
import { EmployeePositionResolver } from './employee-position.resolver';
import { EmployeePositionService } from './employee-position.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    EmployeePositionService,
    EmployeePositionResolver,
    ...employeePositionProviders,
  ],
})
export class EmployeePositionModule {}
