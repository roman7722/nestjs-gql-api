import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
