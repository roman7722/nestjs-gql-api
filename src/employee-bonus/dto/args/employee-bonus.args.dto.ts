import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class EmployeeBonusArgsDto {
  @Field(() => Int, { nullable: false }) id: number;
}
