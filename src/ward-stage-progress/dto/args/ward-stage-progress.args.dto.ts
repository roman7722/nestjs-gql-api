import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class WardStageProgressArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
