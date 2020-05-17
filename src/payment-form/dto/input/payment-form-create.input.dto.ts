import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentFormCreateInputDto {
  @Field(() => String, { nullable: false }) paymentFormName: string;
}
