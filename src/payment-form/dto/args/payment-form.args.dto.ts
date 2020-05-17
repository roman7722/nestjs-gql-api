import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaymentFormArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
