import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OperationModeCreateInput {
  @Field({ nullable: false }) operationModeName: string;
}
