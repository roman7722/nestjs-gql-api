import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PaymentFormUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) paymentFormName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
