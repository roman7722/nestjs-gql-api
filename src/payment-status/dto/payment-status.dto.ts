import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) paymentStatusName?: string;
  @Field(() => String, { nullable: true }) style?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
