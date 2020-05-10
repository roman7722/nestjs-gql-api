import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeePositionArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
