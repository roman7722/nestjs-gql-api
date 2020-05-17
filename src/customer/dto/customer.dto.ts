import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { CityDto } from '../../city/dto/city.dto';
import { CustomerCategoryDto } from '../../customer-category/dto/customer-category.dto';
import { PaymentFormDto } from '../../payment-form/dto/payment-form.dto';
import { SubjectCategoryDto } from '../../subject-category/dto/subject-category.dto';
import { SubjectDto } from '../../subject/dto/subject.dto';
import { UserDto } from '../../user/dto/user.dto';
import { WhatAboutUsDto } from '../../what-about-us/dto/what-about-us.dto';

@ObjectType()
export class CustomerDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field(() => String, { nullable: true }) firstName?: string;
  @Field(() => String, { nullable: true }) middleName?: string;
  @Field(() => String, { nullable: true }) secondName?: string;
  @Field(() => String, { nullable: true }) displayName?: string;
  @Field(() => SubjectCategoryDto, { nullable: true })
  subjectCategory?: SubjectCategoryDto;
  @Field(() => SubjectDto, { nullable: true }) subject?: SubjectDto;
  @Field(() => String, { nullable: true }) phone?: string;
  @Field(() => String, { nullable: true }) email?: string;
  @Field(() => String, { nullable: true }) passportNumber?: string;
  @Field(() => String, { nullable: true }) passportIssuedBy?: string;
  @Field(() => String, { nullable: true }) passportIssuedDate?: string;
  @Field(() => CityDto, { nullable: true }) city?: CityDto;
  @Field(() => String, { nullable: true }) street?: string;
  @Field(() => String, { nullable: true }) apartment?: string;
  @Field(() => String, { nullable: true }) house?: string;
  @Field(() => CustomerCategoryDto, { nullable: true })
  customerCategory?: CustomerCategoryDto;
  @Field(() => PaymentFormDto, { nullable: true }) paymentForm?: PaymentFormDto;
  @Field(() => String, { nullable: true }) companyName?: string;
  @Field(() => WhatAboutUsDto, { nullable: true }) whatAboutUs?: WhatAboutUsDto;
  @Field(() => String, { nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
