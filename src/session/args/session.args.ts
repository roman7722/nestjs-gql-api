import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class SessionArgs {
  @Field(() => Number, { nullable: true })
  userId?: number;
}
