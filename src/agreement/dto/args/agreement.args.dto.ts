import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class AgreementArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
