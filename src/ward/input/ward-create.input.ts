import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class WardCreateInput {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => Int, { nullable: true }) clientId: number;
  @Field({ nullable: true }) fio: string;
  @Field({ nullable: true }) hbDate: Date;
  @Field({ nullable: true }) passportNumber: string;
  @Field({ nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => [Int], { nullable: true }) socialStatusesList: number[];
  @Field(() => Int, { nullable: true }) familyStatusId: number;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => Int, { nullable: true }) districtId: number;
  @Field(() => Int, { nullable: true }) quarterId: number;
  @Field({ nullable: true }) street: string;
  @Field({ nullable: true }) house: string;
  @Field({ nullable: true }) apartment: string;
  @Field({ nullable: true }) floor: string;
  @Field({ nullable: true }) entrance: string;
  @Field({ nullable: true }) phone: string;
  @Field({ nullable: true }) doctorsReport: boolean;
  @Field({ nullable: true }) events: string;
  @Field({ nullable: true }) rem: string;
}
