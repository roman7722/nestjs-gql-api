import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { FamilyStatusListArgsDto } from './dto/args/family-status-list.args.dto';
import { FamilyStatusArgsDto } from './dto/args/family-status.args.dto';
import { FamilyStatusDto } from './dto/family-status.dto';
import { FamilyStatusCreateInputDto } from './dto/input/family-status-create.input.dto';
import { FamilyStatusDeleteInputDto } from './dto/input/family-status-delete.input.dto';
import { FamilyStatusUpdateInputDto } from './dto/input/family-status-update.input.dto';
import { FamilyStatusService } from './family-status.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class FamilyStatusResolver {
  constructor(private readonly familyStatusService: FamilyStatusService) {}

  @Query(() => FamilyStatusDto, {
    nullable: true,
    description: 'Поиск статуса семейнгог положения по id',
  })
  async familyStatus(@Args() { id }: FamilyStatusArgsDto) {
    return await this.familyStatusService.familyStatus(id);
  }

  @Query(() => [FamilyStatusDto], {
    nullable: true,
    description:
      'Поиск статуса семейнгог положения по наименованию и пагинация',
  })
  async familyStatusList(
    @Args() { textFilter, page, paging }: FamilyStatusListArgsDto,
  ) {
    return this.familyStatusService.familyStatusList(textFilter, page, paging);
  }

  @Mutation(() => FamilyStatusDto)
  async familyStatusCreate(@Args('data') data: FamilyStatusCreateInputDto) {
    return await this.familyStatusService.familyStatusCreate(data);
  }

  @Mutation(() => FamilyStatusDto)
  async familyStatusUpdate(@Args('data') data: FamilyStatusUpdateInputDto) {
    return await this.familyStatusService.familyStatusUpdate(data);
  }

  @Mutation(() => Int)
  async familyStatusDelete(@Args('data') data: FamilyStatusDeleteInputDto) {
    return await this.familyStatusService.familyStatusDelete(data);
  }
}
