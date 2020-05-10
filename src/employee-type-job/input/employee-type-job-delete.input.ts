import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeTypeJobDeleteInput {
  @Field(() => Int, { nullable: false }) employeeId: number;
  @Field(() => [Int], { nullable: false }) typeJobsIds: number[];
}
