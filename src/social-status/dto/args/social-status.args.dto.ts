import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class SocialStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
