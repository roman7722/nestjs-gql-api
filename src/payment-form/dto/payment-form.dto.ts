import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentFormDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) paymentFormName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
