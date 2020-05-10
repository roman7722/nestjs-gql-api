import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BonusCategoryArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
