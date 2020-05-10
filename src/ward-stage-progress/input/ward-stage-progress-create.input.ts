import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardStageProgressCreateInput {
  @Field({ nullable: false }) wardStageDate: Date;
  @Field(() => Int, { nullable: false }) wardStageId: number;
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field({ nullable: true }) rem: string;
}
