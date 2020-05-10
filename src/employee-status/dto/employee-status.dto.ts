import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class EmployeeStatusDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field({ nullable: true }) employeeStatusName?: string;
  @Field({ nullable: true }) isEmployeeGroup?: boolean;
  @Field({ nullable: true }) isTimesheetGroup?: boolean;
  @Field(() => Int, { nullable: true }) version?: number;
}
