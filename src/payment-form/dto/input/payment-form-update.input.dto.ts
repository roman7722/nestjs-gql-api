import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaymentFormUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) paymentFormName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
