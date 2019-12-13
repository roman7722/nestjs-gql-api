import { Field, InputType } from 'type-graphql';

@InputType()
export class CreateUserRoleInput {
  @Field() id: string;
  @Field({ nullable: true }) roleDescription: string;
}
