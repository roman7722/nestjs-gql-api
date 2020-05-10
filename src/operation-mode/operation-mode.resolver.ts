import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OperationModeListArgs } from './args/operation-mode-list.args';
import { OperationModeArgs } from './args/operation-mode.args';
import { OperationModeDto } from './dto/operation-mode.dto';
import { OperationModeCreateInput } from './input/operation-mode-create.input';
import { OperationModeDeleteInput } from './input/operation-mode-delete.input';
import { OperationModeUpdateInput } from './input/operation-mode-update.input';
import { OperationModeService } from './operation-mode.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class OperationModeResolver {
  constructor(private readonly operationModeService: OperationModeService) {}

  @Query(() => OperationModeDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async operationMode(@Args() { id }: OperationModeArgs) {
    return await this.operationModeService.operationMode(id);
  }

  @Query(() => [OperationModeDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async operationModeList(
    @Args() { textFilter, page, paging }: OperationModeListArgs,
  ) {
    return this.operationModeService.operationModeList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => OperationModeDto)
  async operationModeCreate(@Args('data') data: OperationModeCreateInput) {
    return await this.operationModeService.operationModeCreate(data);
  }

  @Mutation(() => OperationModeDto)
  async operationModeUpdate(@Args('data') data: OperationModeUpdateInput) {
    return await this.operationModeService.operationModeUpdate(data);
  }

  @Mutation(() => Int)
  async operationModeDelete(@Args('data') data: OperationModeDeleteInput) {
    return await this.operationModeService.operationModeDelete(data);
  }
}
