import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AgreementStatusCreateInput {
  @Field({ nullable: false }) agreementStatusName: string;
  @Field({ nullable: true }) style?: string;
}
