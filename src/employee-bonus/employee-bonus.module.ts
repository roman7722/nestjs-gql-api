import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserModule } from '../user/user.module';
import { employeeBonusProviders } from './employee-bonus.providers';
import { EmployeeBonusResolver } from './employee-bonus.resolver';
import { EmployeeBonusService } from './employee-bonus.service';

@Module({
  imports: [DatabaseModule, UserModule],
  providers: [
    EmployeeBonusService,
    EmployeeBonusResolver,
    ...employeeBonusProviders,
  ],
})
export class EmployeeBonusModule {}
