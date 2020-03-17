import { Field, ID, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class SocialStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) socialStatusName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
