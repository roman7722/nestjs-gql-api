import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class UserRolesArgs {
  @Field(type => Int, { nullable: true })
  ids?: [];
}
