import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class SocialStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
