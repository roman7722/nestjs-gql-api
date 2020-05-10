import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CustomerUpdateInput {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => Int, { nullable: false }) userId: number;
  @Field({ nullable: false }) customerName: string;
  @Field(() => Int, { nullable: true }) subjectCategoryId: number;
  @Field(() => Int, { nullable: true }) subjectId: number;
  @Field({ nullable: true }) phone: string;
  @Field({ nullable: true }) email: string;
  @Field({ nullable: true }) passportNumber: string;
  @Field({ nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field({ nullable: true }) street: string;
  @Field({ nullable: true }) apartment: string;
  @Field({ nullable: true }) house: string;
  @Field(() => Int, { nullable: true }) customerCategoryId: number;
  @Field(() => Int, { nullable: true }) paymentFormId: number;
  @Field({ nullable: true }) companyName: string;
  @Field(() => Int, { nullable: true }) whatAboutUsId: number;
  @Field({ nullable: true }) rem: string;
  @Field(() => Int, { nullable: false }) version: number;
}
