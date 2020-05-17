import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class WardUpdateInputDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: true }) customerId: number;
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field({ nullable: true }) hbDate: Date;
  @Field(() => String, { nullable: true }) passportNumber: string;
  @Field(() => String, { nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => [Int], { nullable: true }) socialStatusesIds: number[];
  @Field(() => Int, { nullable: true }) familyStatusId: number;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => Int, { nullable: true }) districtId: number;
  @Field(() => Int, { nullable: true }) quarterId: number;
  @Field(() => String, { nullable: true }) street: string;
  @Field(() => String, { nullable: true }) house: string;
  @Field(() => String, { nullable: true }) apartment: string;
  @Field(() => String, { nullable: true }) floor: string;
  @Field(() => String, { nullable: true }) entrance: string;
  @Field(() => String, { nullable: true }) phone: string;
  @Field({ nullable: true }) doctorsReport: boolean;
  @Field(() => String, { nullable: true }) events: string;
  @Field(() => String, { nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
