import { Field, InputType } from 'type-graphql';

@InputType()
export class UserRoleCreateInput {
  @Field() id: string;
  @Field({ nullable: true }) roleDescription: string;
}
