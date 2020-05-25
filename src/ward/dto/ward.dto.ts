import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CityDto } from '../../city/dto/city.dto';
import { CustomerDto } from '../../customer/dto/customer.dto';
import { DistrictDto } from '../../district/dto/district.dto';
import { FamilyStatusDto } from '../../family-status/dto/family-status.dto';
import { QuarterDto } from '../../quarter/dto/quarter.dto';
import { SocialStatusDto } from '../../social-status/dto/social-status.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class WardDto {
  @Field(() => Int, { nullable: false }) id: number;
  @Field(() => UserDto, { nullable: false }) user: UserDto;
  @Field(() => CustomerDto, { nullable: true }) customer: CustomerDto;
  @Field(() => String, { nullable: true }) firstName: string;
  @Field(() => String, { nullable: true }) middleName: string;
  @Field(() => String, { nullable: true }) secondName: string;
  @Field(() => String, { nullable: true }) displayName: string;
  @Field({ nullable: true }) hbDate: Date;
  @Field(() => String, { nullable: true }) passportNumber: string;
  @Field(() => String, { nullable: true }) passportIssuedBy: string;
  @Field({ nullable: true }) passportIssuedDate: Date;
  @Field(() => [SocialStatusDto], { nullable: true })
  socialStatuses: SocialStatusDto[];
  @Field(() => FamilyStatusDto, { nullable: true })
  familyStatus: FamilyStatusDto;
  @Field(() => CityDto, { nullable: true }) city: CityDto;
  @Field(() => DistrictDto, { nullable: true }) district: DistrictDto;
  @Field(() => QuarterDto, { nullable: true }) quarter: QuarterDto;
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
  @Field({ nullable: false }) createdAt: Date;
  @Field({ nullable: false }) updatedAt: Date;
}
