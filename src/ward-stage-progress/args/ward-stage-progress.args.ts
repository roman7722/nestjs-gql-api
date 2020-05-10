import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WardStageProgressArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
