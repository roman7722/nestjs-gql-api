import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PositionArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
