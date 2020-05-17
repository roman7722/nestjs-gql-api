import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeStatusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
