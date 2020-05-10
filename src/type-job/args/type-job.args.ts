import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class TypeJobArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
