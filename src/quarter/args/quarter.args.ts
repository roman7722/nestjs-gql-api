import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class QuarterArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
