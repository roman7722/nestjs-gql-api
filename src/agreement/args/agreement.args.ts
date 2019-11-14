import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class AgreementArgs {
  @Field(() => String, { nullable: true })
  numAgreements?: [];
}
