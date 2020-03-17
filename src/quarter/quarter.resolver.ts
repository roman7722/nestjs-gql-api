import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { QuarterListArgs } from './args/quarter-list.args';
import { QuarterArgs } from './args/quarter.args';
import { QuarterDto } from './dto/quarter.dto';
import { QuarterCreateInput } from './input/quarter-create.input';
import { QuarterDeleteInput } from './input/quarter-delete.input';
import { QuarterUpdateInput } from './input/quarter-update.input';
import { QuarterService } from './quarter.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class QuarterResolver {
  constructor(private readonly quarterService: QuarterService) {}

  @Query(() => QuarterDto, {
    nullable: true,
    description: 'Поиск квартала по id',
  })
  async quarter(@Args() { id }: QuarterArgs) {
    return await this.quarterService.quarter(id);
  }

  @Query(() => [QuarterDto], {
    nullable: true,
    description: 'Поиск квартала по наименованию и пагинация',
  })
  async quarterList(@Args() { textFilter, page, paging }: QuarterListArgs) {
    return this.quarterService.quarterList(textFilter, page, paging);
  }

  @Mutation(() => QuarterDto)
  async quarterCreate(@Args('data') data: QuarterCreateInput) {
    return await this.quarterService.quarterCreate(data);
  }

  @Mutation(() => QuarterDto)
  async quarterUpdate(@Args('data') data: QuarterUpdateInput) {
    return await this.quarterService.quarterUpdate(data);
  }

  @Mutation(() => Int)
  async quarterDelete(@Args('data') data: QuarterDeleteInput) {
    return await this.quarterService.quarterDelete(data);
  }
}
