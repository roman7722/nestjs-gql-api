import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardStageUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) wardStageName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
