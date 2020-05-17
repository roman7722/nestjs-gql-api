import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ExecutionStatusCreateInputDto {
  @Field(() => String, { nullable: false }) executionStatusName: string;
  @Field(() => String, { nullable: true }) style?: string;
}
