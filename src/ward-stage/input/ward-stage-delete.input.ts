import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardStageDeleteInput {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
