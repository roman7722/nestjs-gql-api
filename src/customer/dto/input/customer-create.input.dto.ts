import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CustomerCreateInputDto {
  @Field(() => Int, { nullable: false }) userId: number;
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field(() => Int, { nullable: true }) subjectCategoryId: number;
  @Field(() => Int, { nullable: true }) subjectId: number;
  @Field(() => String, { nullable: true }) phone: string;
  @Field(() => String, { nullable: true }) email: string;
  @Field(() => String, { nullable: true }) passportNumber: string;
  @Field(() => String, { nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => Int, { nullable: true }) cityId: number;
  @Field(() => String, { nullable: true }) street: string;
  @Field(() => String, { nullable: true }) apartment: string;
  @Field(() => String, { nullable: true }) house: string;
  @Field(() => Int, { nullable: true }) customerCategoryId: number;
  @Field(() => Int, { nullable: true }) paymentFormId: number;
  @Field(() => String, { nullable: true }) companyName: string;
  @Field(() => Int, { nullable: true }) whatAboutUsId: number;
  @Field(() => String, { nullable: true }) rem: string;
}
