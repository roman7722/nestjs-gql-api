import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FamilyStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
