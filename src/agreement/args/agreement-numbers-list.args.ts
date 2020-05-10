import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AgreementNumbersListArgs {
  @Field(() => String, { nullable: true }) agreementNumber?: [];
}
