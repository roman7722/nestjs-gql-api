import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AgreementStatusService } from './agreement-status.service';
import { AgreementStatusListArgs } from './args/agreement-status-list.args';
import { AgreementStatusArgs } from './args/agreement-status.args';
import { AgreementStatusDto } from './dto/agreement-status.dto';
import { AgreementStatusCreateInput } from './input/agreement-status-create.input';
import { AgreementStatusDeleteInput } from './input/agreement-status-delete.input';
import { AgreementStatusUpdateInput } from './input/agreement-status-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class AgreementStatusResolver {
  constructor(
    private readonly agreementStatusService: AgreementStatusService,
  ) {}

  @Query(() => AgreementStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async agreementStatus(@Args() { id }: AgreementStatusArgs) {
    return await this.agreementStatusService.agreementStatus(id);
  }

  @Query(() => [AgreementStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async agreementStatusList(
    @Args() { textFilter, page, paging }: AgreementStatusListArgs,
  ) {
    return this.agreementStatusService.agreementStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => AgreementStatusDto)
  async agreementStatusCreate(@Args('data') data: AgreementStatusCreateInput) {
    return await this.agreementStatusService.agreementStatusCreate(data);
  }

  @Mutation(() => AgreementStatusDto)
  async agreementStatusUpdate(@Args('data') data: AgreementStatusUpdateInput) {
    return await this.agreementStatusService.agreementStatusUpdate(data);
  }

  @Mutation(() => Int)
  async agreementStatusDelete(@Args('data') data: AgreementStatusDeleteInput) {
    return await this.agreementStatusService.agreementStatusDelete(data);
  }
}
