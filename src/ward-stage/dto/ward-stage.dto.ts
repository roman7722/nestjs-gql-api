import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WardStageDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) wardStageName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
