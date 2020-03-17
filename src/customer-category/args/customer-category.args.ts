import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class CustomerCategoryArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
