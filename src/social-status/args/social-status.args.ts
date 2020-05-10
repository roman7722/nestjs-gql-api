import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SocialStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
