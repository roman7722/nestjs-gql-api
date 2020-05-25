import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeStatusDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => String, { nullable: false }) employeeStatusName: string;
  @Field({ nullable: false }) isEmployeeGroup: boolean;
  @Field({ nullable: false }) isTimesheetGroup: boolean;
  @Field(() => Int, { nullable: false }) version: number;
}
