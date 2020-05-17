import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class ExecutionStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
