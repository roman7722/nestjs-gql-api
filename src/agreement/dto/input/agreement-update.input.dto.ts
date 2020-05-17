import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AgreementUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) agreementNumber: string;
  @Field(() => String, { nullable: false }) agreementDate: Date;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: false }) customerId: number;
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field(() => Int, { nullable: false }) agreementStatusId: number;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
