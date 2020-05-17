import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EmployeeStatusCreateInputDto {
  @Field(() => String, { nullable: false }) employeeStatusName: string;
  @Field({ nullable: false }) isEmployeeGroup: boolean;
  @Field({ nullable: false }) isTimesheetGroup: boolean;
}
