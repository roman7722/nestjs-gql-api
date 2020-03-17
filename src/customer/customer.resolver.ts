import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CustomerListArgs } from './args/customer-list.args';
import { CustomerArgs } from './args/customer.args';
import { CustomerService } from './customer.service';
import { CustomerDto } from './dto/customer.dto';
import { CustomerCreateInput } from './input/customer-create.input';
import { CustomerDeleteInput } from './input/customer-delete.input';
import { CustomerUpdateInput } from './input/customer-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @Query(() => CustomerDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async customer(@Args() { id }: CustomerArgs) {
    return await this.customerService.customer(id);
  }

  @Query(() => [CustomerDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async customerList(@Args() { textFilter, page, paging }: CustomerListArgs) {
    return this.customerService.customerList(textFilter, page, paging);
  }

  @Mutation(() => CustomerDto)
  async customerCreate(@Args('data') data: CustomerCreateInput) {
    return await this.customerService.customerCreate(data);
  }

  @Mutation(() => CustomerDto)
  async customerUpdate(@Args('data') data: CustomerUpdateInput) {
    return await this.customerService.customerUpdate(data);
  }

  @Mutation(() => Int)
  async customerDelete(@Args('data') data: CustomerDeleteInput) {
    return await this.customerService.customerDelete(data);
  }
}
