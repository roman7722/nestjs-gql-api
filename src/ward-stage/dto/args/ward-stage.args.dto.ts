import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WardStageArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
