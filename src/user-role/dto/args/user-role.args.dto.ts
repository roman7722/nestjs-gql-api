import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class UserRoleArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
