import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
