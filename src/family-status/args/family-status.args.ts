import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class FamilyStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
