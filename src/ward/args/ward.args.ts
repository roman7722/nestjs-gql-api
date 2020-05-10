import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WardArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
