import { ArgsType, Field } from 'type-graphql';

@ArgsType()
export class UserRolesArgs {
  @Field(type => String, { nullable: true })
  ids?: [];
}
