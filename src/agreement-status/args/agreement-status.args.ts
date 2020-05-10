import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class AgreementStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
