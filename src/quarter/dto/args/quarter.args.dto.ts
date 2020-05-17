import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class QuarterArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
