import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { BonusService } from './bonus.service';
import { BonusListArgsDto } from './dto/args/bonus-list.args.dto';
import { BonusArgsDto } from './dto/args/bonus.args.dto';
import { BonusDto } from './dto/bonus.dto';
import { BonusCreateInputDto } from './dto/input/bonus-create.input.dto';
import { BonusDeleteInputDto } from './dto/input/bonus-delete.input.dto';
import { BonusUpdateInputDto } from './dto/input/bonus-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class BonusResolver {
  constructor(private readonly bonusService: BonusService) {}

  @Query(() => BonusDto, {
    nullable: true,
    description: 'Поиск начисления или удержания по id',
  })
  async bonus(@Args() { id }: BonusArgsDto) {
    return await this.bonusService.bonus(id);
  }

  @Query(() => [BonusDto], {
    nullable: true,
    description: 'Поиск начисления или удержания по наименованию и пагинация',
  })
  async bonusList(@Args() { textFilter, page, paging }: BonusListArgsDto) {
    return this.bonusService.bonusList(textFilter, page, paging);
  }

  @Mutation(() => BonusDto)
  async bonusCreate(@Args('data') data: BonusCreateInputDto) {
    return await this.bonusService.bonusCreate(data);
  }

  @Mutation(() => BonusDto)
  async bonusUpdate(@Args('data') data: BonusUpdateInputDto) {
    return await this.bonusService.bonusUpdate(data);
  }

  @Mutation(() => Int)
  async bonusDelete(@Args('data') data: BonusDeleteInputDto) {
    return await this.bonusService.bonusDelete(data);
  }
}
