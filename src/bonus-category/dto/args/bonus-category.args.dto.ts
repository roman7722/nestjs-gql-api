import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class BonusCategoryArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
