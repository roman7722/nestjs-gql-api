import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeStatusListArgsDto } from './dto/args/employee-status-list.args.dto';
import { EmployeeStatusArgsDto } from './dto/args/employee-status.args.dto';
import { EmployeeStatusDto } from './dto/employee-status.dto';
import { EmployeeStatusCreateInputDto } from './dto/input/employee-status-create.input.dto';
import { EmployeeStatusDeleteInputDto } from './dto/input/employee-status-delete.input.dto';
import { EmployeeStatusUpdateInputDto } from './dto/input/employee-status-update.input.dto';
import { EmployeeStatusService } from './employee-status.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeeStatusResolver {
  constructor(private readonly employeeStatusService: EmployeeStatusService) {}

  @Query(() => EmployeeStatusDto, {
    nullable: true,
    description: 'Поиск статуса сотрудника по id',
  })
  async employeeStatus(@Args() { id }: EmployeeStatusArgsDto) {
    return await this.employeeStatusService.employeeStatus(id);
  }

  @Query(() => [EmployeeStatusDto], {
    nullable: true,
    description: 'Поиск статуса сотрудника по наименованию и пагинация',
  })
  async employeeStatusList(
    @Args() { textFilter, page, paging }: EmployeeStatusListArgsDto,
  ) {
    return this.employeeStatusService.employeeStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeeStatusDto)
  async employeeStatusCreate(@Args('data') data: EmployeeStatusCreateInputDto) {
    return await this.employeeStatusService.employeeStatusCreate(data);
  }

  @Mutation(() => EmployeeStatusDto)
  async employeeStatusUpdate(@Args('data') data: EmployeeStatusUpdateInputDto) {
    return await this.employeeStatusService.employeeStatusUpdate(data);
  }

  @Mutation(() => Int)
  async employeeStatusDelete(@Args('data') data: EmployeeStatusDeleteInputDto) {
    return await this.employeeStatusService.employeeStatusDelete(data);
  }
}
