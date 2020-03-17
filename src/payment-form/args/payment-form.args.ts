import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaymentFormArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
