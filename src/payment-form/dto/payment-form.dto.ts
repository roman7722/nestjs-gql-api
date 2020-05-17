import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentFormDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) paymentFormName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
