import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BonusListArgs } from './args/bonus-list.args';
import { BonusArgs } from './args/bonus.args';
import { BonusService } from './bonus.service';
import { BonusDto } from './dto/bonus.dto';
import { BonusCreateInput } from './input/bonus-create.input';
import { BonusDeleteInput } from './input/bonus-delete.input';
import { BonusUpdateInput } from './input/bonus-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class BonusResolver {
  constructor(private readonly bonusService: BonusService) {}

  @Query(() => BonusDto, {
    nullable: true,
    description: 'Поиск начисления или удержания по id',
  })
  async bonus(@Args() { id }: BonusArgs) {
    return await this.bonusService.bonus(id);
  }

  @Query(() => [BonusDto], {
    nullable: true,
    description: 'Поиск начисления или удержания по наименованию и пагинация',
  })
  async bonusList(@Args() { textFilter, page, paging }: BonusListArgs) {
    return this.bonusService.bonusList(textFilter, page, paging);
  }

  @Mutation(() => BonusDto)
  async bonusCreate(@Args('data') data: BonusCreateInput) {
    return await this.bonusService.bonusCreate(data);
  }

  @Mutation(() => BonusDto)
  async bonusUpdate(@Args('data') data: BonusUpdateInput) {
    return await this.bonusService.bonusUpdate(data);
  }

  @Mutation(() => Int)
  async bonusDelete(@Args('data') data: BonusDeleteInput) {
    return await this.bonusService.bonusDelete(data);
  }
}
