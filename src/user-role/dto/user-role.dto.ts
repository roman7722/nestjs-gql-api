import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class UserRoleDto {
  @Field(() => ID, { nullable: true })
  id?: number;

  @Field({ nullable: true })
  roleName?: string;
}
