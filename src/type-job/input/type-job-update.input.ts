import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class TypeJobUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) typeJobName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
