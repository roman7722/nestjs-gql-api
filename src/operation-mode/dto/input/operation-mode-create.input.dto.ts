import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class OperationModeCreateInputDto {
  @Field(() => String, { nullable: false }) operationModeName: string;
}
