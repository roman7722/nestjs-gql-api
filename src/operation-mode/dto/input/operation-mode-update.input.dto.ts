import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class OperationModeUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) operationModeName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
