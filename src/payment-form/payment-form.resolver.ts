import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Roles } from '../auth/decorators/roles.decorator';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { PaymentFormListArgsDto } from './dto/args/payment-form-list.args.dto';
import { PaymentFormArgsDto } from './dto/args/payment-form.args.dto';
import { PaymentFormCreateInputDto } from './dto/input/payment-form-create.input.dto';
import { PaymentFormDeleteInputDto } from './dto/input/payment-form-delete.input.dto';
import { PaymentFormUpdateInputDto } from './dto/input/payment-form-update.input.dto';
import { PaymentFormDto } from './dto/payment-form.dto';
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
  async paymentForm(@Args() { id }: PaymentFormArgsDto) {
    return await this.paymentFormService.paymentForm(id);
  }

  @Query(() => [PaymentFormDto], {
    nullable: true,
    description: 'Поиск формы оплаты по наименованию и пагинация',
  })
  async paymentFormList(
    @Args() { textFilter, page, paging }: PaymentFormListArgsDto,
  ) {
    return this.paymentFormService.paymentFormList(textFilter, page, paging);
  }

  @Mutation(() => PaymentFormDto)
  async paymentFormCreate(@Args('data') data: PaymentFormCreateInputDto) {
    return await this.paymentFormService.paymentFormCreate(data);
  }

  @Mutation(() => PaymentFormDto)
  async paymentFormUpdate(@Args('data') data: PaymentFormUpdateInputDto) {
    return await this.paymentFormService.paymentFormUpdate(data);
  }

  @Mutation(() => Int)
  async paymentFormDelete(@Args('data') data: PaymentFormDeleteInputDto) {
    return await this.paymentFormService.paymentFormDelete(data);
  }
}
