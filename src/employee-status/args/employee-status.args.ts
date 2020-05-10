import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeStatusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
