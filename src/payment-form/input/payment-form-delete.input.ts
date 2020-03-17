import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class PaymentFormDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
