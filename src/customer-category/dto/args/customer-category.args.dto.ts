import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CustomerCategoryArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
