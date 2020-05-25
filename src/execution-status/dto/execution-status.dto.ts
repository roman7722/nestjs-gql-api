import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExecutionStatusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) executionStatusName: string;
  @Field(() => String, { nullable: true }) style: string;
  @Field(() => Int, { nullable: false }) version: number;
}
