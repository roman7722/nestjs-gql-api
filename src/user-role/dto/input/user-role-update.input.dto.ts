import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserRoleUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: true }) userRoleName: string;
  @Field(() => String, { nullable: true }) userRoleDescription: string;
  @Field(() => Int, { nullable: false }) version: number;
}
