import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRoleDto {
  @Field(() => Int, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) userRoleName?: string;
  @Field(() => String, { nullable: true }) userRoleDescription?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
