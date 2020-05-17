import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class AgreementStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
