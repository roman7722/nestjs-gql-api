import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OperationModeDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) operationModeName?: string;
  @Field(() => Int, { nullable: true }) version?: number;
}
