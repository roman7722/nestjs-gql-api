import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ExecutionStatusUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) executionStatusName: string;
  @Field(() => String, { nullable: true }) style?: string;
  @Field(() => Int, { nullable: false }) version: number;
}
