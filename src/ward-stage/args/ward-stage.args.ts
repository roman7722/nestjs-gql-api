import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WardStageArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
