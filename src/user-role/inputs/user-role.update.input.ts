import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => Int) id: number;
  @Field(() => String) roleName: string;
}
