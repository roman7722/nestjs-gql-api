import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ExecutionStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => String, { nullable: true }) executionStatusName?: string;
  @Field(() => String, { nullable: true }) style?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
