import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { WhatAboutUsListArgs } from './args/what-about-us-list.args';
import { WhatAboutUsArgs } from './args/what-about-us.args';
import { WhatAboutUsDto } from './dto/what-about-us.dto';
import { WhatAboutUsCreateInput } from './input/what-about-us-create.input';
import { WhatAboutUsDeleteInput } from './input/what-about-us-delete.input';
import { WhatAboutUsUpdateInput } from './input/what-about-us-update.input';
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
  async whatAboutUs(@Args() { id }: WhatAboutUsArgs) {
    return await this.whatAboutUsService.whatAboutUs(id);
  }

  @Query(() => [WhatAboutUsDto], {
    nullable: true,
    description: 'Поиск населённого пункта по наименованию и пагинация',
  })
  async whatAboutUsList(
    @Args() { textFilter, page, paging }: WhatAboutUsListArgs,
  ) {
    return this.whatAboutUsService.whatAboutUsList(textFilter, page, paging);
  }

  @Mutation(() => WhatAboutUsDto)
  async whatAboutUsCreate(@Args('data') data: WhatAboutUsCreateInput) {
    return await this.whatAboutUsService.whatAboutUsCreate(data);
  }

  @Mutation(() => WhatAboutUsDto)
  async whatAboutUsUpdate(@Args('data') data: WhatAboutUsUpdateInput) {
    return await this.whatAboutUsService.whatAboutUsUpdate(data);
  }

  @Mutation(() => Int)
  async whatAboutUsDelete(@Args('data') data: WhatAboutUsDeleteInput) {
    return await this.whatAboutUsService.whatAboutUsDelete(data);
  }
}
