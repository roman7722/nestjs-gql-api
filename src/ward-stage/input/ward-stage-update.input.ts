import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardStageUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) wardStageName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
