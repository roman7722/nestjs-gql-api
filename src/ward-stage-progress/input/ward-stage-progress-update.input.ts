import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardStageProgressUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) wardStageDate: Date;
  @Field({ nullable: false }) wardStageId: number;
  @Field({ nullable: false }) wardId: number;
  @Field({ nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
