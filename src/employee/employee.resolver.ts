import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeListArgs } from './args/employee-list.args';
import { EmployeeArgs } from './args/employee.args';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';
import { EmployeeCreateInput } from './input/employee-create.input';
import { EmployeeDeleteInput } from './input/employee-delete.input';
import { EmployeeUpdateInput } from './input/employee-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => EmployeeDto, {
    nullable: true,
    description: 'Поиск сотрудника по id',
  })
  async employee(@Args() { id }: EmployeeArgs) {
    return await this.employeeService.employee(id);
  }

  @Query(() => [EmployeeDto], {
    nullable: true,
    description: 'Поиск сотрудника по имени и пагинация',
  })
  async employeeList(@Args() { textFilter, page, paging }: EmployeeListArgs) {
    return this.employeeService.employeeList(textFilter, page, paging);
  }

  @Mutation(() => EmployeeDto)
  async employeeCreate(@Args('data') data: EmployeeCreateInput) {
    return await this.employeeService.employeeCreate(data);
  }

  @Mutation(() => EmployeeDto)
  async employeeUpdate(@Args('data') data: EmployeeUpdateInput) {
    return await this.employeeService.employeeUpdate(data);
  }

  @Mutation(() => Int)
  async employeeDelete(@Args('data') data: EmployeeDeleteInput) {
    return await this.employeeService.employeeDelete(data);
  }
}
