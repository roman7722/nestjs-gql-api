import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BonusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
