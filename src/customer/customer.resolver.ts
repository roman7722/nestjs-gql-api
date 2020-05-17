import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CustomerService } from './customer.service';
import { CustomerListArgsDto } from './dto/args/customer-list.args.dto';
import { CustomerArgsDto } from './dto/args/customer.args.dto';
import { CustomerDto } from './dto/customer.dto';
import { CustomerCreateInputDto } from './dto/input/customer-create.input.dto';
import { CustomerDeleteInputDto } from './dto/input/customer-delete.input.dto';
import { CustomerUpdateInputDto } from './dto/input/customer-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async customer(@Args() { id }: CustomerArgsDto) {
    return await this.customerService.customer(id);
  }

  @Query(() => [CustomerDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async customerList(
    @Args() { textFilter, page, paging }: CustomerListArgsDto,
  ) {
    return this.customerService.customerList(textFilter, page, paging);
  }

  @Mutation(() => CustomerDto)
  async customerCreate(@Args('data') data: CustomerCreateInputDto) {
    return await this.customerService.customerCreate(data);
  }

  @Mutation(() => CustomerDto)
  async customerUpdate(@Args('data') data: CustomerUpdateInputDto) {
    return await this.customerService.customerUpdate(data);
  }

  @Mutation(() => Int)
  async customerDelete(@Args('data') data: CustomerDeleteInputDto) {
    return await this.customerService.customerDelete(data);
  }
}
