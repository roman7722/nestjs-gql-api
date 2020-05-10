import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserRoleDeleteInput {
  @Field(() => String) id: string;
  @Field(() => Int, { nullable: false }) version: number;
}
