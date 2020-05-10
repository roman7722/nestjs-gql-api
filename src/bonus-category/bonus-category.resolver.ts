import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BonusCategoryListArgs } from './args/bonus-category-list.args';
import { BonusCategoryArgs } from './args/bonus-category.args';
import { BonusCategoryService } from './bonus-category.service';
import { BonusCategoryDto } from './dto/bonus-category.dto';
import { BonusCategoryCreateInput } from './input/bonus-category-create.input';
import { BonusCategoryDeleteInput } from './input/bonus-category-delete.input';
import { BonusCategoryUpdateInput } from './input/bonus-category-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class BonusCategoryResolver {
  constructor(private readonly bonusCategoryService: BonusCategoryService) {}

  @Query(() => BonusCategoryDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async bonusCategory(@Args() { id }: BonusCategoryArgs) {
    return await this.bonusCategoryService.bonusCategory(id);
  }

  @Query(() => [BonusCategoryDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async bonusCategoryList(
    @Args() { textFilter, page, paging }: BonusCategoryListArgs,
  ) {
    return this.bonusCategoryService.bonusCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => BonusCategoryDto)
  async bonusCategoryCreate(@Args('data') data: BonusCategoryCreateInput) {
    return await this.bonusCategoryService.bonusCategoryCreate(data);
  }

  @Mutation(() => BonusCategoryDto)
  async bonusCategoryUpdate(@Args('data') data: BonusCategoryUpdateInput) {
    return await this.bonusCategoryService.bonusCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async bonusCategoryDelete(@Args('data') data: BonusCategoryDeleteInput) {
    return await this.bonusCategoryService.bonusCategoryDelete(data);
  }
}
