import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field(() => String, { nullable: true }) displayName: string;
  @Field({ nullable: true }) hbDate: Date;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => Int, { nullable: true }) districtId: number;
  @Field(() => Int, { nullable: true }) quarterId: number;
  @Field(() => String, { nullable: true }) street: string;
  @Field(() => String, { nullable: true }) house: string;
  @Field(() => String, { nullable: true }) apartment: string;
  @Field(() => String, { nullable: true }) education: string;
  @Field(() => String, { nullable: true }) phone: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => Int, { nullable: true }) employeeStatusId: number;
  @Field(() => Int, { nullable: true }) operationModeId: number;
  @Field(() => [Int], { nullable: true }) typeJobsIds: number[];
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
