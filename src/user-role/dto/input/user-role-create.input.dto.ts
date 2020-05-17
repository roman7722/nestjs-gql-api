import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserRoleCreateInputDto {
  @Field(() => String, { nullable: false }) userRoleName: string;
  @Field(() => String, { nullable: true }) userRoleDescription: string;
}
