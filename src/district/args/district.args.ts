import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class DistrictArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
