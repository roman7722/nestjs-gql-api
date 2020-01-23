import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class UserRoleDto {
  @Field({ nullable: true }) id?: string;
  @Field({ nullable: true }) roleDescription?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
