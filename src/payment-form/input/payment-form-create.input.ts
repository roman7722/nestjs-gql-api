import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentFormCreateInput {
  @Field({ nullable: false }) paymentFormName: string;
}
