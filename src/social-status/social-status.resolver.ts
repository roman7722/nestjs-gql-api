import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { SocialStatusListArgsDto } from './dto/args/social-status-list.args.dto';
import { SocialStatusArgsDto } from './dto/args/social-status.args.dto';
import { SocialStatusCreateInputDto } from './dto/input/social-status-create.input.dto';
import { SocialStatusDeleteInputDto } from './dto/input/social-status-delete.input.dto';
import { SocialStatusUpdateInputDto } from './dto/input/social-status-update.input.dto';
import { SocialStatusDto } from './dto/social-status.dto';
import { SocialStatusService } from './social-status.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class SocialStatusResolver {
  constructor(private readonly socialStatusService: SocialStatusService) {}

  @Query(() => SocialStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async socialStatus(@Args() { id }: SocialStatusArgsDto) {
    return await this.socialStatusService.socialStatus(id);
  }

  @Query(() => [SocialStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async socialStatusList(
    @Args() { textFilter, page, paging }: SocialStatusListArgsDto,
  ) {
    return this.socialStatusService.socialStatusList(textFilter, page, paging);
  }

  @Mutation(() => SocialStatusDto)
  async socialStatusCreate(@Args('data') data: SocialStatusCreateInputDto) {
    return await this.socialStatusService.socialStatusCreate(data);
  }

  @Mutation(() => SocialStatusDto)
  async socialStatusUpdate(@Args('data') data: SocialStatusUpdateInputDto) {
    return await this.socialStatusService.socialStatusUpdate(data);
  }

  @Mutation(() => Int)
  async socialStatusDelete(@Args('data') data: SocialStatusDeleteInputDto) {
    return await this.socialStatusService.socialStatusDelete(data);
  }
}
