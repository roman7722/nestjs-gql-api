import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CustomerCategoryListArgs } from './args/customer-category-list.args';
import { CustomerCategoryArgs } from './args/customer-category.args';
import { CustomerCategoryService } from './customer-category.service';
import { CustomerCategoryDto } from './dto/customer-category.dto';
import { CustomerCategoryCreateInput } from './input/customer-category-create.input';
import { CustomerCategoryDeleteInput } from './input/customer-category-delete.input';
import { CustomerCategoryUpdateInput } from './input/customer-category-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class CustomerCategoryResolver {
  constructor(private readonly customerCategoryService: CustomerCategoryService) {}

  @Query(() => CustomerCategoryDto, {
    nullable: true,
    description: 'Поиск категории клиента по id',
  })
  async customerCategory(@Args() { id }: CustomerCategoryArgs) {
    return await this.customerCategoryService.customerCategory(id);
  }

  @Query(() => [CustomerCategoryDto], {
    nullable: true,
    description: 'Поиск категории клиента по наименованию и пагинация',
  })
  async customerCategoryList(
    @Args() { textFilter, page, paging }: CustomerCategoryListArgs,
  ) {
    return this.customerCategoryService.customerCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => CustomerCategoryDto)
  async customerCategoryCreate(@Args('data') data: CustomerCategoryCreateInput) {
    return await this.customerCategoryService.customerCategoryCreate(data);
  }

  @Mutation(() => CustomerCategoryDto)
  async customerCategoryUpdate(@Args('data') data: CustomerCategoryUpdateInput) {
    return await this.customerCategoryService.customerCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async customerCategoryDelete(@Args('data') data: CustomerCategoryDeleteInput) {
    return await this.customerCategoryService.customerCategoryDelete(data);
  }
}
