import { Field, InputType } from 'type-graphql';

@InputType()
export class UserRoleUpdateInput {
  @Field(() => String) id: string;
  @Field(() => String, { nullable: true }) roleDescription: string;
}
