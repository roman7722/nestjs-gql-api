import { Field, ID, Int, ObjectType } from 'type-graphql';
import { CityDto } from '../../city/dto/city.dto';
import { CustomerDto } from '../../customer/dto/customer.dto';
import { DistrictDto } from '../../district/dto/district.dto';
import { FamilyStatusDto } from '../../family-status/dto/family-status.dto';
import { QuarterDto } from '../../quarter/dto/quarter.dto';
import { SocialStatusDto } from '../../social-status/dto/social-status.dto';
import { UserDto } from '../../user/dto/user.dto';

@ObjectType()
export class WardDto {
  @Field(() => ID, { nullable: true }) id?: number;
  @Field(() => UserDto, { nullable: true }) user?: UserDto;
  @Field(() => CustomerDto, { nullable: true }) customer?: CustomerDto;
  @Field({ nullable: true }) fio?: string;
  @Field({ nullable: true }) hbDate?: Date;
  @Field({ nullable: true }) passportNumber?: string;
  @Field({ nullable: true }) passportIssuedBy?: string;
  @Field({ nullable: true }) passportIssuedDate?: Date;
  @Field(() => [SocialStatusDto], { nullable: true })
  socialStatusesList?: SocialStatusDto[];
  @Field(() => FamilyStatusDto, { nullable: true })
  familyStatus?: FamilyStatusDto;
  @Field(() => CityDto, { nullable: true }) city?: CityDto;
  @Field(() => DistrictDto, { nullable: true }) district?: DistrictDto;
  @Field(() => QuarterDto, { nullable: true }) quarter?: QuarterDto;
  @Field({ nullable: true }) street?: string;
  @Field({ nullable: true }) house?: string;
  @Field({ nullable: true }) apartment?: string;
  @Field({ nullable: true }) floor?: string;
  @Field({ nullable: true }) entrance?: string;
  @Field({ nullable: true }) phone?: string;
  @Field({ nullable: true }) doctorsReport?: boolean;
  @Field({ nullable: true }) events?: string;
  @Field({ nullable: true }) rem?: string;
  @Field(() => Int, { nullable: true }) version?: number;
  @Field({ nullable: true }) createdAt?: Date;
  @Field({ nullable: true }) updatedAt?: Date;
}
