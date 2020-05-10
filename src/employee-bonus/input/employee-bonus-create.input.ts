import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EmployeeBonusCreateInput {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: false }) employeeId: number;
  @Field({ nullable: false }) bonusDate: Date;
  @Field(() => Int, { nullable: false }) bonusCategoryId: number;
  @Field(() => Int, { nullable: false }) bonusId: number;
  @Field(() => Float, { nullable: false }) cost: number;
  @Field({ nullable: true }) rem: string;
}
