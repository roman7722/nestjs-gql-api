import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SocialStatusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) socialStatusName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
