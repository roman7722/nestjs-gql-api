import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BonusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
