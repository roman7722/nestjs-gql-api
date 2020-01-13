import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserDeleteInput {
  @Field(() => Int) id: number;
}
