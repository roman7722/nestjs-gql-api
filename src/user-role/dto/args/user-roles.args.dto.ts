import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserRolesArgsDto {
  @Field(() => [String], { nullable: true }) userRoleNames?: string[];
}
