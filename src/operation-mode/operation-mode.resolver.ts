import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { OperationModeListArgsDto } from './dto/args/operation-mode-list.args.dto';
import { OperationModeArgsDto } from './dto/args/operation-mode.args.dto';
import { OperationModeCreateInputDto } from './dto/input/operation-mode-create.input.dto';
import { OperationModeDeleteInputDto } from './dto/input/operation-mode-delete.input.dto';
import { OperationModeUpdateInputDto } from './dto/input/operation-mode-update.input.dto';
import { OperationModeDto } from './dto/operation-mode.dto';
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
  async operationMode(@Args() { id }: OperationModeArgsDto) {
    return await this.operationModeService.operationMode(id);
  }

  @Query(() => [OperationModeDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async operationModeList(
    @Args() { textFilter, page, paging }: OperationModeListArgsDto,
  ) {
    return this.operationModeService.operationModeList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => OperationModeDto)
  async operationModeCreate(@Args('data') data: OperationModeCreateInputDto) {
    return await this.operationModeService.operationModeCreate(data);
  }

  @Mutation(() => OperationModeDto)
  async operationModeUpdate(@Args('data') data: OperationModeUpdateInputDto) {
    return await this.operationModeService.operationModeUpdate(data);
  }

  @Mutation(() => Int)
  async operationModeDelete(@Args('data') data: OperationModeDeleteInputDto) {
    return await this.operationModeService.operationModeDelete(data);
  }
}
