import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeBonusListArgs } from './args/employee-bonus-list.args';
import { EmployeeBonusArgs } from './args/employee-bonus.args';
import { EmployeeBonusDto } from './dto/employee-bonus.dto';
import { EmployeeBonusService } from './employee-bonus.service';
import { EmployeeBonusCreateInput } from './input/employee-bonus-create.input';
import { EmployeeBonusDeleteInput } from './input/employee-bonus-delete.input';
import { EmployeeBonusUpdateInput } from './input/employee-bonus-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeeBonusResolver {
  constructor(private readonly employeeBonusService: EmployeeBonusService) {}

  @Query(() => EmployeeBonusDto, {
    nullable: true,
    description: 'Поиск НиУ по id',
  })
  async employeeBonus(@Args() { id }: EmployeeBonusArgs) {
    return await this.employeeBonusService.employeeBonus(id);
  }

  @Query(() => [EmployeeBonusDto], {
    nullable: true,
    description: 'Поиск НиУ по примечанию и пагинация',
  })
  async employeeBonusList(
    @Args() { textFilter, page, paging }: EmployeeBonusListArgs,
  ) {
    return this.employeeBonusService.employeeBonusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeeBonusDto)
  async employeeBonusCreate(@Args('data') data: EmployeeBonusCreateInput) {
    return await this.employeeBonusService.employeeBonusCreate(data);
  }

  @Mutation(() => EmployeeBonusDto)
  async employeeBonusUpdate(@Args('data') data: EmployeeBonusUpdateInput) {
    return await this.employeeBonusService.employeeBonusUpdate(data);
  }

  @Mutation(() => Int)
  async employeeBonusDelete(@Args('data') data: EmployeeBonusDeleteInput) {
    return await this.employeeBonusService.employeeBonusDelete(data);
  }
}
