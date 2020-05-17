import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ServicePackUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) agreementId: number;

  @Field(() => Int, { nullable: true }) totalCost: number;
  @Field(() => Int, { nullable: true }) prepayment: number;
  @Field(() => Int, { nullable: true }) debt: number;

  @Field(() => Int, { nullable: false }) executionStatusId: number;
  @Field(() => Int, { nullable: false }) paymentStatusId: number;

  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
