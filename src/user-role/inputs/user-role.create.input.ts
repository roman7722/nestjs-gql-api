import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserRoleInput {
  @Field() roleName: string;
}
