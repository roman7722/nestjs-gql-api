import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class DeleteUserRoleInput {
  @Field(() => Int) id: number;
}
