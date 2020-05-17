import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BonusCategoryService } from './bonus-category.service';
import { BonusCategoryListArgsDto } from './dto/args/bonus-category-list.args.dto';
import { BonusCategoryArgsDto } from './dto/args/bonus-category.args.dto';
import { BonusCategoryDto } from './dto/bonus-category.dto';
import { BonusCategoryCreateInputDto } from './dto/input/bonus-category-create.input.dto';
import { BonusCategoryDeleteInputDto } from './dto/input/bonus-category-delete.input.dto';
import { BonusCategoryUpdateInputDto } from './dto/input/bonus-category-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class BonusCategoryResolver {
  constructor(private readonly bonusCategoryService: BonusCategoryService) {}

  @Query(() => BonusCategoryDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async bonusCategory(@Args() { id }: BonusCategoryArgsDto) {
    return await this.bonusCategoryService.bonusCategory(id);
  }

  @Query(() => [BonusCategoryDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async bonusCategoryList(
    @Args() { textFilter, page, paging }: BonusCategoryListArgsDto,
  ) {
    return this.bonusCategoryService.bonusCategoryList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => BonusCategoryDto)
  async bonusCategoryCreate(@Args('data') data: BonusCategoryCreateInputDto) {
    return await this.bonusCategoryService.bonusCategoryCreate(data);
  }

  @Mutation(() => BonusCategoryDto)
  async bonusCategoryUpdate(@Args('data') data: BonusCategoryUpdateInputDto) {
    return await this.bonusCategoryService.bonusCategoryUpdate(data);
  }

  @Mutation(() => Int)
  async bonusCategoryDelete(@Args('data') data: BonusCategoryDeleteInputDto) {
    return await this.bonusCategoryService.bonusCategoryDelete(data);
  }
}
