import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeBonusArgs {
  @Field(() => Int, { nullable: false }) id: number;
}
