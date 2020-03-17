import { Int } from 'type-graphql';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaymentFormListArgs } from './args/payment-form-list.args';
import { PaymentFormArgs } from './args/payment-form.args';
import { PaymentFormDto } from './dto/payment-form.dto';
import { PaymentFormCreateInput } from './input/payment-form-create.input';
import { PaymentFormDeleteInput } from './input/payment-form-delete.input';
import { PaymentFormUpdateInput } from './input/payment-form-update.input';
import { PaymentFormService } from './payment-form.service';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
@Roles('MANAGER', 'ADMIN')
export class PaymentFormResolver {
  constructor(private readonly paymentFormService: PaymentFormService) {}

  @Query(() => PaymentFormDto, {
    nullable: true,
    description: 'Поиск формы оплаты по id',
  })
  async paymentForm(@Args() { id }: PaymentFormArgs) {
    return await this.paymentFormService.paymentForm(id);
  }

  @Query(() => [PaymentFormDto], {
    nullable: true,
    description: 'Поиск формы оплаты по наименованию и пагинация',
  })
  async paymentFormList(
    @Args() { textFilter, page, paging }: PaymentFormListArgs,
  ) {
    return this.paymentFormService.paymentFormList(textFilter, page, paging);
  }

  @Mutation(() => PaymentFormDto)
  async paymentFormCreate(@Args('data') data: PaymentFormCreateInput) {
    return await this.paymentFormService.paymentFormCreate(data);
  }

  @Mutation(() => PaymentFormDto)
  async paymentFormUpdate(@Args('data') data: PaymentFormUpdateInput) {
    return await this.paymentFormService.paymentFormUpdate(data);
  }

  @Mutation(() => Int)
  async paymentFormDelete(@Args('data') data: PaymentFormDeleteInput) {
    return await this.paymentFormService.paymentFormDelete(data);
  }
}
