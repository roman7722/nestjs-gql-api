import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CustomerArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
