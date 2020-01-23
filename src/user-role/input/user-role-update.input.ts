import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class UserRoleUpdateInput {
  @Field(() => String) id: string;
  @Field(() => String, { nullable: true }) roleDescription: string;
  @Field(() => Int, { nullable: false }) version: number;
}
