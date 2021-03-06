import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeBonusDeleteInputDto {
  @Field(() => Int) id: number;
  @Field(() => Int, { nullable: false }) version: number;
}
