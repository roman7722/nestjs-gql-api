import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaymentStatusListArgsDto } from './dto/args/payment-status-list.args.dto';
import { PaymentStatusArgsDto } from './dto/args/payment-status.args.dto';
import { PaymentStatusCreateInputDto } from './dto/input/payment-status-create.input.dto';
import { PaymentStatusDeleteInputDto } from './dto/input/payment-status-delete.input.dto';
import { PaymentStatusUpdateInputDto } from './dto/input/payment-status-update.input.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentStatusService } from './payment-status.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER')
export class PaymentStatusResolver {
  constructor(private readonly paymentStatusService: PaymentStatusService) {}

  @Query(() => PaymentStatusDto, {
    nullable: true,
    description: 'Поиск социального статуса по id',
  })
  async paymentStatus(@Args() { id }: PaymentStatusArgsDto) {
    return await this.paymentStatusService.paymentStatus(id);
  }

  @Query(() => [PaymentStatusDto], {
    nullable: true,
    description: 'Поиск социального статуса по наименованию и пагинация',
  })
  async paymentStatusList(
    @Args() { textFilter, page, paging }: PaymentStatusListArgsDto,
  ) {
    return this.paymentStatusService.paymentStatusList(
      textFilter,
      page,
      paging,
    );
  }

  @Mutation(() => PaymentStatusDto)
  async paymentStatusCreate(@Args('data') data: PaymentStatusCreateInputDto) {
    return await this.paymentStatusService.paymentStatusCreate(data);
  }

  @Mutation(() => PaymentStatusDto)
  async paymentStatusUpdate(@Args('data') data: PaymentStatusUpdateInputDto) {
    return await this.paymentStatusService.paymentStatusUpdate(data);
  }

  @Mutation(() => Int)
  async paymentStatusDelete(@Args('data') data: PaymentStatusDeleteInputDto) {
    return await this.paymentStatusService.paymentStatusDelete(data);
  }
}
