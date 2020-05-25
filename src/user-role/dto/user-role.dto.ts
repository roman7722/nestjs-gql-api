import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserRoleDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) userRoleName: string;
  @Field(() => String, { nullable: true }) userRoleDescription: string;
  @Field(() => Int, { nullable: false }) version: number;
}
