import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeTypeJobUpdateInput {
  @Field(() => Int, { nullable: false }) employeeId: number;
  @Field(() => [Int], { nullable: false }) oldTypeJobsIds: number[];
  @Field(() => [Int], { nullable: false }) newTypeJobsIds: number[];
}
