import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class TokenArgs {
  @Field(type => Number, { nullable: true })
  userId?: number;
}
