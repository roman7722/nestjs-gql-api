import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class AgreementNumbersListArgsDto {
  @Field(() => String, { nullable: true }) agreementNumber?: [];
}
