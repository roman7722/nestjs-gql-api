import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AgreementStatusCreateInputDto {
  @Field(() => String, { nullable: false }) agreementStatusName: string;
  @Field(() => String, { nullable: true }) style?: string;
}
