import { Field, InputType } from 'type-graphql';

@InputType()
export class WardStageProgressCreateInput {
  @Field({ nullable: false }) wardStageDate: Date;
  @Field({ nullable: false }) wardStageId: number;
  @Field({ nullable: false }) wardId: number;
  @Field({ nullable: true }) rem: string;
}
