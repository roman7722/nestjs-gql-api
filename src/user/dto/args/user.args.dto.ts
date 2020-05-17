import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
