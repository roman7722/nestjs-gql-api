import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CustomerCategoryArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
