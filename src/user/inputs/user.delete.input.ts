import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class DeleteUserInput {
  @Field(() => Int) id: number;
}
