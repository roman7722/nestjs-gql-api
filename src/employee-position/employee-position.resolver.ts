import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeePositionListArgsDto } from './dto/args/employee-position-list.args.dto';
import { EmployeePositionArgsDto } from './dto/args/employee-position.args.dto';
import { EmployeePositionDto } from './dto/employee-position.dto';
import { EmployeePositionCreateInputDto } from './dto/input/employee-position-create.input.dto';
import { EmployeePositionDeleteInputDto } from './dto/input/employee-position-delete.input.dto';
import { EmployeePositionUpdateInputDto } from './dto/input/employee-position-update.input.dto';
import { EmployeePositionService } from './employee-position.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeePositionResolver {
  constructor(
    private readonly employeePositionService: EmployeePositionService,
  ) {}

  @Query(() => EmployeePositionDto, {
    nullable: true,
    description: 'Поиск должности сотрудника по id',
  })
  async employeePosition(@Args() { id }: EmployeePositionArgsDto) {
    return await this.employeePositionService.employeePosition(id);
  }

  @Query(() => [EmployeePositionDto], {
    nullable: true,
    description: 'Поиск должности сотрудника по наименованию и пагинация',
  })
  async employeePositionList(
    @Args() { textFilter, page, paging }: EmployeePositionListArgsDto,
  ) {
    return this.employeePositionService.employeePositionList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeePositionDto)
  async employeePositionCreate(
    @Args('data') data: EmployeePositionCreateInputDto,
  ) {
    return await this.employeePositionService.employeePositionCreate(data);
  }

  @Mutation(() => EmployeePositionDto)
  async employeePositionUpdate(
    @Args('data') data: EmployeePositionUpdateInputDto,
  ) {
    return await this.employeePositionService.employeePositionUpdate(data);
  }

  @Mutation(() => Int)
  async employeePositionDelete(
    @Args('data') data: EmployeePositionDeleteInputDto,
  ) {
    return await this.employeePositionService.employeePositionDelete(data);
  }
}
