import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeListArgsDto } from './dto/args/employee-list.args.dto';
import { EmployeeArgsDto } from './dto/args/employee.args.dto';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeCreateInputDto } from './dto/input/employee-create.input.dto';
import { EmployeeDeleteInputDto } from './dto/input/employee-delete.input.dto';
import { EmployeeUpdateInputDto } from './dto/input/employee-update.input.dto';
import { EmployeeService } from './employee.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Query(() => EmployeeDto, {
    nullable: true,
    description: 'Поиск сотрудника по id',
  })
  async employee(@Args() { id }: EmployeeArgsDto) {
    return await this.employeeService.employee(id);
  }

  @Query(() => [EmployeeDto], {
    nullable: true,
    description: 'Поиск сотрудника по имени и пагинация',
  })
  async employeeList(
    @Args() { textFilter, page, paging }: EmployeeListArgsDto,
  ) {
    return this.employeeService.employeeList(textFilter, page, paging);
  }

  @Mutation(() => EmployeeDto)
  async employeeCreate(@Args('data') data: EmployeeCreateInputDto) {
    return await this.employeeService.employeeCreate(data);
  }

  @Mutation(() => EmployeeDto)
  async employeeUpdate(@Args('data') data: EmployeeUpdateInputDto) {
    return await this.employeeService.employeeUpdate(data);
  }

  @Mutation(() => Int)
  async employeeDelete(@Args('data') data: EmployeeDeleteInputDto) {
    return await this.employeeService.employeeDelete(data);
  }
}
