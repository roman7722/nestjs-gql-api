import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaymentStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
