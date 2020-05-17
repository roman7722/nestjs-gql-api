import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class CustomerArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
