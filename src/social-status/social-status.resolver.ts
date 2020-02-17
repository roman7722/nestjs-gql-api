import { Int } from 'type-graphql';
// import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// import { Roles } from '../auth/decorators/roles.decorator';
// import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
import { SocialStatusListArgs } from './args/social-status-list.args';
import { SocialStatusArgs } from './args/social-status.args';
import { SocialStatusDto } from './dto/social-status.dto';
import { SocialStatusCreateInput } from './input/social-status-create.input';
import { SocialStatusDeleteInput } from './input/social-status-delete.input';
import { SocialStatusUpdateInput } from './input/social-status-update.input';
import { SocialStatusService } from './social-status.service';

@Resolver()
// @UseGuards(GqlAuthGuard, RolesGuard)
// @Roles('ADMIN', 'MANAGER')
export class SocialStatusResolver {
  constructor(private readonly socialStatusService: SocialStatusService) {}

  @Query(() => SocialStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async socialStatus(@Args() { id }: SocialStatusArgs) {
    return await this.socialStatusService.socialStatus(id);
  }

  @Query(() => [SocialStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async socialStatusList(
    @Args() { textFilter, page, paging }: SocialStatusListArgs,
  ) {
    return this.socialStatusService.socialStatusList(textFilter, page, paging);
  }

  @Mutation(() => SocialStatusDto)
  async socialStatusCreate(@Args('data') data: SocialStatusCreateInput) {
    return await this.socialStatusService.socialStatusCreate(data);
  }

  @Mutation(() => SocialStatusDto)
  async socialStatusUpdate(@Args('data') data: SocialStatusUpdateInput) {
    return await this.socialStatusService.socialStatusUpdate(data);
  }

  @Mutation(() => Int)
  async socialStatusDelete(@Args('data') data: SocialStatusDeleteInput) {
    return await this.socialStatusService.socialStatusDelete(data);
  }
}
