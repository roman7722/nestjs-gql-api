import { Field, InputType } from 'type-graphql';

@InputType()
export class PaymentFormCreateInput {
  @Field({ nullable: false }) paymentFormName: string;
}
