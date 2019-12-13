import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteUserRoleInput {
  @Field(() => String) id: string;
}
