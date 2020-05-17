import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PaymentStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) paymentStatusName: string;
  @Field(() => String, { nullable: true }) style?: string;
  @Field(() => Int, { nullable: false }) version: number;
}
