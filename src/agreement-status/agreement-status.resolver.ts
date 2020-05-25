import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AgreementStatusService } from './agreement-status.service';
import { AgreementStatusDto } from './dto/agreement-status.dto';
import { AgreementStatusListArgsDto } from './dto/args/agreement-status-list.args.dto';
import { AgreementStatusArgsDto } from './dto/args/agreement-status.args.dto';
import { AgreementStatusCreateInputDto } from './dto/input/agreement-status-create.input.dto';
import { AgreementStatusDeleteInputDto } from './dto/input/agreement-status-delete.input.dto';
import { AgreementStatusUpdateInputDto } from './dto/input/agreement-status-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class AgreementStatusResolver {
  constructor(
    private readonly agreementStatusService: AgreementStatusService,
  ) {}

  @Query(() => AgreementStatusDto, {
    nullable: true,
    description: 'Поиск статуса договора по id',
  })
  async agreementStatus(@Args() { id }: AgreementStatusArgsDto) {
    return await this.agreementStatusService.agreementStatus(id);
  }

  @Query(() => [AgreementStatusDto], {
    nullable: true,
    description: 'Поиск статуса договора по наименованию и пагинация',
  })
  async agreementStatusList(
    @Args() { textFilter, page, paging }: AgreementStatusListArgsDto,
  ) {
    return this.agreementStatusService.agreementStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => AgreementStatusDto)
  async agreementStatusCreate(
    @Args('data') data: AgreementStatusCreateInputDto,
  ) {
    return await this.agreementStatusService.agreementStatusCreate(data);
  }

  @Mutation(() => AgreementStatusDto)
  async agreementStatusUpdate(
    @Args('data') data: AgreementStatusUpdateInputDto,
  ) {
    return await this.agreementStatusService.agreementStatusUpdate(data);
  }

  @Mutation(() => Int)
  async agreementStatusDelete(
    @Args('data') data: AgreementStatusDeleteInputDto,
  ) {
    return await this.agreementStatusService.agreementStatusDelete(data);
  }
}
