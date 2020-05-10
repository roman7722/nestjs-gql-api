import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AgreementCreateInput {
  @Field({ nullable: false }) agreementNumber: string;
  @Field({ nullable: false }) agreementDate: Date;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: false }) customerId: number;
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field(() => Int, { nullable: false }) agreementStatusId: number;
  @Field({ nullable: true }) rem: string;
}
