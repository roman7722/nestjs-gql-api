import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeStatusUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field({ nullable: false }) employeeStatusName: string;
  @Field({ nullable: false }) isEmployeeGroup: boolean;
  @Field({ nullable: false }) isTimesheetGroup: boolean;
  @Field(() => Int, { nullable: false }) version: number;
}
