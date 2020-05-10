import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserRolesArgs {
  @Field(type => String, { nullable: true })
  ids?: [];
}
