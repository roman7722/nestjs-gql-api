import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SocialStatusCreateInputDto {
  @Field(() => String, { nullable: false }) socialStatusName: string;
}
