import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class CityArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
