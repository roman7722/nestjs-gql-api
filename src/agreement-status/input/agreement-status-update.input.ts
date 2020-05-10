import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AgreementStatusUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) agreementStatusName: string;
  @Field({ nullable: true }) style?: string;
  @Field(() => Int, { nullable: false }) version: number;
}
