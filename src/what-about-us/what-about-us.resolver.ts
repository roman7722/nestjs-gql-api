import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WhatAboutUsListArgsDto } from './dto/args/what-about-us-list.args.dto';
import { WhatAboutUsArgsDto } from './dto/args/what-about-us.args.dto';
import { WhatAboutUsCreateInputDto } from './dto/input/what-about-us-create.input.dto';
import { WhatAboutUsDeleteInputDto } from './dto/input/what-about-us-delete.input.dto';
import { WhatAboutUsUpdateInputDto } from './dto/input/what-about-us-update.input.dto';
import { WhatAboutUsDto } from './dto/what-about-us.dto';
import { WhatAboutUsService } from './what-about-us.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class WhatAboutUsResolver {
  constructor(private readonly whatAboutUsService: WhatAboutUsService) {}

  @Query(() => WhatAboutUsDto, {
    nullable: true,
    description: 'Поиск населённого пункта по id',
  })
  async whatAboutUs(@Args() { id }: WhatAboutUsArgsDto) {
    return await this.whatAboutUsService.whatAboutUs(id);
  }

  @Query(() => [WhatAboutUsDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async whatAboutUsList(
    @Args() { textFilter, page, paging }: WhatAboutUsListArgsDto,
  ) {
    return this.whatAboutUsService.whatAboutUsList(textFilter, page, paging);
  }

  @Mutation(() => WhatAboutUsDto)
  async whatAboutUsCreate(@Args('data') data: WhatAboutUsCreateInputDto) {
    return await this.whatAboutUsService.whatAboutUsCreate(data);
  }

  @Mutation(() => WhatAboutUsDto)
  async whatAboutUsUpdate(@Args('data') data: WhatAboutUsUpdateInputDto) {
    return await this.whatAboutUsService.whatAboutUsUpdate(data);
  }

  @Mutation(() => Int)
  async whatAboutUsDelete(@Args('data') data: WhatAboutUsDeleteInputDto) {
    return await this.whatAboutUsService.whatAboutUsDelete(data);
  }
}
