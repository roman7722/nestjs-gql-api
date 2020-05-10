import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeStatusListArgs } from './args/employee-status-list.args';
import { EmployeeStatusArgs } from './args/employee-status.args';
import { EmployeeStatusDto } from './dto/employee-status.dto';
import { EmployeeStatusService } from './employee-status.service';
import { EmployeeStatusCreateInput } from './input/employee-status-create.input';
import { EmployeeStatusDeleteInput } from './input/employee-status-delete.input';
import { EmployeeStatusUpdateInput } from './input/employee-status-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeeStatusResolver {
  constructor(private readonly employeeStatusService: EmployeeStatusService) {}

  @Query(() => EmployeeStatusDto, {
    nullable: true,
    description: 'Поиск статуса сотрудника по id',
  })
  async employeeStatus(@Args() { id }: EmployeeStatusArgs) {
    return await this.employeeStatusService.employeeStatus(id);
  }

  @Query(() => [EmployeeStatusDto], {
    nullable: true,
    description: 'Поиск статуса сотрудника по наименованию и пагинация',
  })
  async employeeStatusList(
    @Args() { textFilter, page, paging }: EmployeeStatusListArgs,
  ) {
    return this.employeeStatusService.employeeStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeeStatusDto)
  async employeeStatusCreate(@Args('data') data: EmployeeStatusCreateInput) {
    return await this.employeeStatusService.employeeStatusCreate(data);
  }

  @Mutation(() => EmployeeStatusDto)
  async employeeStatusUpdate(@Args('data') data: EmployeeStatusUpdateInput) {
    return await this.employeeStatusService.employeeStatusUpdate(data);
  }

  @Mutation(() => Int)
  async employeeStatusDelete(@Args('data') data: EmployeeStatusDeleteInput) {
    return await this.employeeStatusService.employeeStatusDelete(data);
  }
}
