import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserRoleInput {
  @Field(() => String) id: string;
  @Field(() => String, { nullable: true }) roleDescription: string;
}
