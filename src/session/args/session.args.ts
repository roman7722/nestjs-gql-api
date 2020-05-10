import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class SessionArgs {
  @Field(() => Number, { nullable: true })
  userId?: number;
}
