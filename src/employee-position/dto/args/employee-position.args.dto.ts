import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeePositionArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
