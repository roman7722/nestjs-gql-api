import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class DistrictArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
