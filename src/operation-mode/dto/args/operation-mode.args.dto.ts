import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class OperationModeArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
