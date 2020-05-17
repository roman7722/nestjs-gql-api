import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { EmployeeBonusListArgsDto } from './dto/args/employee-bonus-list.args.dto';
import { EmployeeBonusArgsDto } from './dto/args/employee-bonus.args.dto';
import { EmployeeBonusDto } from './dto/employee-bonus.dto';
import { EmployeeBonusCreateInputDto } from './dto/input/employee-bonus-create.input.dto';
import { EmployeeBonusDeleteInputDto } from './dto/input/employee-bonus-delete.input.dto';
import { EmployeeBonusUpdateInputDto } from './dto/input/employee-bonus-update.input.dto';
import { EmployeeBonusService } from './employee-bonus.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class EmployeeBonusResolver {
  constructor(private readonly employeeBonusService: EmployeeBonusService) {}

  @Query(() => EmployeeBonusDto, {
    nullable: true,
    description: 'Поиск НиУ по id',
  })
  async employeeBonus(@Args() { id }: EmployeeBonusArgsDto) {
    return await this.employeeBonusService.employeeBonus(id);
  }

  @Query(() => [EmployeeBonusDto], {
    nullable: true,
    description: 'Поиск НиУ по примечанию и пагинация',
  })
  async employeeBonusList(
    @Args() { textFilter, page, paging }: EmployeeBonusListArgsDto,
  ) {
    return this.employeeBonusService.employeeBonusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => EmployeeBonusDto)
  async employeeBonusCreate(@Args('data') data: EmployeeBonusCreateInputDto) {
    return await this.employeeBonusService.employeeBonusCreate(data);
  }

  @Mutation(() => EmployeeBonusDto)
  async employeeBonusUpdate(@Args('data') data: EmployeeBonusUpdateInputDto) {
    return await this.employeeBonusService.employeeBonusUpdate(data);
  }

  @Mutation(() => Int)
  async employeeBonusDelete(@Args('data') data: EmployeeBonusDeleteInputDto) {
    return await this.employeeBonusService.employeeBonusDelete(data);
  }
}
