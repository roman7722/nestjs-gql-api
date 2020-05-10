import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRoleCreateInput {
  @Field() id: string;
  @Field({ nullable: true }) roleDescription: string;
}
