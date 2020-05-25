import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OperationModeDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) operationModeName: string;
  @Field(() => Int, { nullable: false }) version: number;
}
