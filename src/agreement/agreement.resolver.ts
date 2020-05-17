import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AgreementService } from './agreement.service';
import { AgreementDto } from './dto/agreement.dto';
import { AgreementListArgsDto } from './dto/args/agreement-list.args.dto';
import { AgreementNumbersListArgsDto } from './dto/args/agreement-numbers-list.args.dto';
import { AgreementArgsDto } from './dto/args/agreement.args.dto';
import { AgreementCreateInputDto } from './dto/input/agreement-create.input.dto';
import { AgreementDeleteInputDto } from './dto/input/agreement-delete.input.dto';
import { AgreementUpdateInputDto } from './dto/input/agreement-update.input.dto';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class AgreementResolver {
  constructor(private readonly agreementService: AgreementService) {}

  @Query(() => AgreementDto, {
    nullable: true,
    description: 'Поиск договора по id',
  })
  async agreement(@Args() { id }: AgreementArgsDto) {
    return await this.agreementService.agreement(id);
  }

  @Query(() => [AgreementDto], {
    nullable: true,
    description: 'Поиск договора по номеру и пагинация',
  })
  async agreementList(
    @Args() { textFilter, page, paging }: AgreementListArgsDto,
  ) {
    return this.agreementService.agreementList(textFilter, page, paging);
  }

  @Query(() => [AgreementDto], {
    nullable: true,
    description: 'Поиск договоров по номерам (точное совпадение)',
  })
  async agreementsNumbersFind(
    @Args() { agreementNumber }: AgreementNumbersListArgsDto,
  ) {
    return await this.agreementService.agreementsNumbersFind(agreementNumber);
  }

  @Mutation(() => AgreementDto)
  async agreementCreate(@Args('data') data: AgreementCreateInputDto) {
    return await this.agreementService.agreementCreate(data);
  }

  @Mutation(() => AgreementDto)
  async agreementUpdate(@Args('data') data: AgreementUpdateInputDto) {
    return await this.agreementService.agreementUpdate(data);
  }

  @Mutation(() => Int)
  async agreementDelete(@Args('data') data: AgreementDeleteInputDto) {
    return await this.agreementService.agreementDelete(data);
  }
}
