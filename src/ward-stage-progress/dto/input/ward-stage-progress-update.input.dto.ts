import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardStageProgressUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) wardStageDate: Date;
  @Field(() => Int, { nullable: false }) wardStageId: number;
  @Field(() => Int, { nullable: false }) wardId: number;
  @Field({ nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
