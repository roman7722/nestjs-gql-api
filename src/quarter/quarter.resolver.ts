import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { QuarterListArgsDto } from './dto/args/quarter-list.args.dto';
import { QuarterArgsDto } from './dto/args/quarter.args.dto';
import { QuarterCreateInputDto } from './dto/input/quarter-create.input.dto';
import { QuarterDeleteInputDto } from './dto/input/quarter-delete.input.dto';
import { QuarterUpdateInputDto } from './dto/input/quarter-update.input.dto';
import { QuarterDto } from './dto/quarter.dto';
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
  async quarter(@Args() { id }: QuarterArgsDto) {
    return await this.quarterService.quarter(id);
  }

  @Query(() => [QuarterDto], {
    nullable: true,
    description: 'Поиск квартала по наименованию и пагинация',
  })
  async quarterList(@Args() { textFilter, page, paging }: QuarterListArgsDto) {
    return this.quarterService.quarterList(textFilter, page, paging);
  }

  @Mutation(() => QuarterDto)
  async quarterCreate(@Args('data') data: QuarterCreateInputDto) {
    return await this.quarterService.quarterCreate(data);
  }

  @Mutation(() => QuarterDto)
  async quarterUpdate(@Args('data') data: QuarterUpdateInputDto) {
    return await this.quarterService.quarterUpdate(data);
  }

  @Mutation(() => Int)
  async quarterDelete(@Args('data') data: QuarterDeleteInputDto) {
    return await this.quarterService.quarterDelete(data);
  }
}
