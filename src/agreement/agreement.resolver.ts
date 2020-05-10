import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AgreementService } from './agreement.service';
import { AgreementListArgs } from './args/agreement-list.args';
import { AgreementNumbersListArgs } from './args/agreement-numbers-list.args';
import { AgreementArgs } from './args/agreement.args';
import { AgreementDto } from './dto/agreement.dto';
import { AgreementCreateInput } from './input/agreement-create.input';
import { AgreementDeleteInput } from './input/agreement-delete.input';
import { AgreementUpdateInput } from './input/agreement-update.input';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class AgreementResolver {
  constructor(private readonly agreementService: AgreementService) {}

  @Query(() => AgreementDto, {
    nullable: true,
    description: 'Поиск договора по id',
  })
  async agreement(@Args() { id }: AgreementArgs) {
    return await this.agreementService.agreement(id);
  }

  @Query(() => [AgreementDto], {
    nullable: true,
    description: 'Поиск договора по номеру и пагинация',
  })
  async agreementList(@Args() { textFilter, page, paging }: AgreementListArgs) {
    return this.agreementService.agreementList(textFilter, page, paging);
  }

  @Query(() => [AgreementDto], {
    nullable: true,
    description: 'Поиск договоров по номерам (точное совпадение)',
  })
  async agreementsNumbersFind(
    @Args() { agreementNumber }: AgreementNumbersListArgs,
  ) {
    return await this.agreementService.agreementsNumbersFind(agreementNumber);
  }

  @Mutation(() => AgreementDto)
  async agreementCreate(@Args('data') data: AgreementCreateInput) {
    return await this.agreementService.agreementCreate(data);
  }

  @Mutation(() => AgreementDto)
  async agreementUpdate(@Args('data') data: AgreementUpdateInput) {
    return await this.agreementService.agreementUpdate(data);
  }

  @Mutation(() => Int)
  async agreementDelete(@Args('data') data: AgreementDeleteInput) {
    return await this.agreementService.agreementDelete(data);
  }
}
