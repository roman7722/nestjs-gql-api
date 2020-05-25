import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TypeJobDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) typeJobName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
