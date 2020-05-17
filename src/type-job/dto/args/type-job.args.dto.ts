import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TypeJobArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
