import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UserRoleArgs {
  @Field(() => String, { nullable: false })
  id: string;
}
