import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FamilyStatusListArgs } from './args/family-status-list.args';
import { FamilyStatusArgs } from './args/family-status.args';
import { FamilyStatusDto } from './dto/family-status.dto';
import { FamilyStatusService } from './family-status.service';
import { FamilyStatusCreateInput } from './input/family-status-create.input';
import { FamilyStatusDeleteInput } from './input/family-status-delete.input';
import { FamilyStatusUpdateInput } from './input/family-status-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class FamilyStatusResolver {
  constructor(private readonly familyStatusService: FamilyStatusService) {}

  @Query(() => FamilyStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async familyStatus(@Args() { id }: FamilyStatusArgs) {
    return await this.familyStatusService.familyStatus(id);
  }

  @Query(() => [FamilyStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async familyStatusList(
    @Args() { textFilter, page, paging }: FamilyStatusListArgs,
  ) {
    return this.familyStatusService.familyStatusList(textFilter, page, paging);
  }

  @Mutation(() => FamilyStatusDto)
  async familyStatusCreate(@Args('data') data: FamilyStatusCreateInput) {
    return await this.familyStatusService.familyStatusCreate(data);
  }

  @Mutation(() => FamilyStatusDto)
  async familyStatusUpdate(@Args('data') data: FamilyStatusUpdateInput) {
    return await this.familyStatusService.familyStatusUpdate(data);
  }

  @Mutation(() => Int)
  async familyStatusDelete(@Args('data') data: FamilyStatusDeleteInput) {
    return await this.familyStatusService.familyStatusDelete(data);
  }
}
