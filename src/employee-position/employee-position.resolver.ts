import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeePositionListArgs } from './args/employee-position-list.args';
import { EmployeePositionArgs } from './args/employee-position.args';
import { EmployeePositionDto } from './dto/employee-position.dto';
import { EmployeePositionService } from './employee-position.service';
import { EmployeePositionCreateInput } from './input/employee-position-create.input';
import { EmployeePositionDeleteInput } from './input/employee-position-delete.input';
import { EmployeePositionUpdateInput } from './input/employee-position-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeePositionResolver {
  constructor(
    private readonly employeePositionService: EmployeePositionService,
  ) {}

  @Query(() => EmployeePositionDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async employeePosition(@Args() { id }: EmployeePositionArgs) {
    return await this.employeePositionService.employeePosition(id);
  }

  @Query(() => [EmployeePositionDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async employeePositionList(
    @Args() { textFilter, page, paging }: EmployeePositionListArgs,
  ) {
    return this.employeePositionService.employeePositionList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeePositionDto)
  async employeePositionCreate(
    @Args('data') data: EmployeePositionCreateInput,
  ) {
    return await this.employeePositionService.employeePositionCreate(data);
  }

  @Mutation(() => EmployeePositionDto)
  async employeePositionUpdate(
    @Args('data') data: EmployeePositionUpdateInput,
  ) {
    return await this.employeePositionService.employeePositionUpdate(data);
  }

  @Mutation(() => Int)
  async employeePositionDelete(
    @Args('data') data: EmployeePositionDeleteInput,
  ) {
    return await this.employeePositionService.employeePositionDelete(data);
  }
}
