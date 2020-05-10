import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OperationModeUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) operationModeName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
