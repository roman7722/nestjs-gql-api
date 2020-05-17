import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaymentStatusCreateInputDto {
  @Field(() => String, { nullable: false }) paymentStatusName: string;
  @Field({ nullable: true }) style?: string;
}
