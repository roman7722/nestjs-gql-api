import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeePositionCreateInputDto {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: false }) employeeId: number;
  @Field({ nullable: false }) positionDateStart: Date;
  @Field({ nullable: false }) positionDateEnd: Date;
  @Field(() => Int, { nullable: false }) positionId: number;
  @Field(() => Float, { nullable: false }) tariff: number;
  @Field(() => String, { nullable: true }) rem: string;
}
