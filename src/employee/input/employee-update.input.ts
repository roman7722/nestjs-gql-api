import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field({ nullable: false }) employeeName: string;
  @Field({ nullable: true }) hbDate: Date;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => Int, { nullable: true }) districtId: number;
  @Field(() => Int, { nullable: true }) quarterId: number;
  @Field({ nullable: true }) street: string;
  @Field({ nullable: true }) house: string;
  @Field({ nullable: true }) apartment: string;
  @Field({ nullable: true }) education: string;
  @Field({ nullable: true }) phone: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => Int, { nullable: true }) employeeStatusId: number;
  @Field(() => Int, { nullable: true }) operationModeId: number;
  @Field(() => [Int], { nullable: true }) typeJobsIds: number[];
  @Field({ nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
