import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class OperationModeArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
