import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class CustomerArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
